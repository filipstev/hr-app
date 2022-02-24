import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Modal from '../Modal/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useQuery } from 'react-query';
import Avatar from '../../assets/avatar.png';
import classes from './UserTeam.module.css';
import { TextField } from '@mui/material';
import Spinner from '../Spinner.js/Spinner';

function compareLast(a, b) {
    if (a.attributes.createdAt > b.attributes.createdAt) {
        return -1;
    }
    if (a.attributes.createdAt < b.attributes.createdAt) {
        return 1;
    }
    return 0;
}

function compareFirst(a, b) {
    if (a.attributes.createdAt < b.attributes.createdAt) {
        return -1;
    }
    if (a.attributes.createdAt > b.attributes.createdAt) {
        return 1;
    }
    return 0;
}

function compareName(a, b) {
    if (a.attributes.name < b.attributes.name) {
        return -1;
    }
    if (a.attributes.name > b.attributes.name) {
        return 1;
    }
    return 0;
}

const UserTeam = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [allProfiles, setAllProfiles] = useState([]);
    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState([]);
    const [sort, setSort] = useState('DESC');
    const [nameFilter, setNameFilter] = useState('');
    const [emptyFilter, setEmptyFilter] = useState(false);
    const [order, setOrder] = useState('DESC');
    const [searching, setSearching] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const getUserProfile = async () => {
        const profileId = await axiosInstance.get(
            `/profiles?filters[user][id][$eq]=${user.user.id}&populate=*`
        );
        return profileId;
    };

    const fetchProfiles = async (order) => {
        const userStorage = JSON.parse(localStorage.getItem('user'));

        const resUser = await axiosInstance.get(
            '/profiles?filters[user][id][$eq]=' +
                userStorage.user.id +
                '&populate=*'
        );

        const resCompany = await axiosInstance.get(
            '/companies?filters[profiles][id][$eq]=' +
                resUser.data.data[0].id +
                '&populate=*'
        );

        let res;
        if (order === 'name') {
            res = await axiosInstance.get(
                '/profiles?filters[company][id][$eq]=' +
                    resCompany.data.data[0].id +
                    '&populate=*&sort=name:ASC&filters[status][$eq]=published'
            );
        } else {
            res = await axiosInstance.get(
                '/profiles?filters[company][id][$eq]=' +
                    resCompany.data.data[0].id +
                    '&populate=*&sort=createdAt:' +
                    order +
                    '&filters[status]=published'
            );
        }
        console.log(res);
        let publishedProfiles = [];

        res.data.data.map((profile) => {
            if (profile.attributes.status === 'published') {
                publishedProfiles.push(profile);
            }
        });
        if (publishedProfiles.length === 0) {
            setEmptyFilter(true);
        }
        setAllProfiles(publishedProfiles);
        return publishedProfiles;
    };

    const handleChange = (e) => {
        setSort(e.target.value);
        setOrder(e.target.value);
    };

    const onNameFilterChange = (e) => {
        if (e.target.value === '') {
            setNameFilter(e.target.value);
            setSearching(false);
            return;
        }
        setNameFilter(e.target.value);
        setSearching(true);
    };

    const { data, status, refetch } = useQuery(['team-profiles', order], () =>
        fetchProfiles(order)
    );

    useEffect(() => {
        let newProfiles = [];
        if (nameFilter !== '') {
            allProfiles.map((profile) => {
                if (
                    profile.attributes.name
                        .toLowerCase()
                        .includes(nameFilter.toLowerCase())
                ) {
                    console.log(profile);
                    newProfiles.push(profile);
                }
            });
            setProfiles(newProfiles);
            if (newProfiles.length === 0) {
                setEmptyFilter(true);
            }
        } else {
            setEmptyFilter(false);
            setProfiles(allProfiles);
        }
    }, [nameFilter]);

    const openModal = (id, attributes) => {
        setModalOpen(true);
        setModalInfo([id, attributes]);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    if (status === 'loading') {
        return <Spinner />;
    }

    //TODO: PROVERITI ZA STATUS, DA LI SVE ILI SAMO PUBLISHED
    const showProfiles = (shouldFilter) => {
        if (!shouldFilter) {
            return data?.map(({ id, attributes }) => {
                let image;
                if (attributes.profilePhoto.data !== null) {
                    image = attributes.profilePhoto.data.attributes.url;
                }

                if (attributes.status === 'published') {
                    return (
                        <Grid
                            item
                            key={id}
                            onClick={() => openModal(id, attributes)}
                            sx={{
                                cursor: 'pointer',
                                alignItems: 'center',
                            }}
                            className={classes.Grid}
                        >
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {image ? (
                                        <img
                                            src={image}
                                            style={{
                                                width: '200px',
                                                height: '200px',
                                                margin: '15px 0',
                                                alignSelf: 'center',
                                                justifySelf: 'center',

                                                objectFit: 'cover',
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={Avatar}
                                            style={{
                                                width: '200px',
                                                height: '200px',
                                                margin: '15px 0',
                                                alignSelf: 'center',
                                                justifySelf: 'center',

                                                objectFit: 'cover',
                                            }}
                                        />
                                    )}

                                    <Typography
                                        sx={{ mb: 1.5 }}
                                        color="text.secondary"
                                    >
                                        Name: {attributes.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        Joined:{' '}
                                        {new Date(attributes.createdAt)
                                            .toDateString()
                                            .split(' ')
                                            .splice(1, 4)
                                            .join(' ')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                }
            });
        } else {
            return profiles?.map(({ id, attributes }) => {
                let image;
                if (attributes.profilePhoto.data !== null) {
                    image = attributes.profilePhoto.data.attributes.url;
                }

                if (attributes.status === 'published') {
                    return (
                        <Grid
                            item
                            key={id}
                            onClick={() => openModal(id, attributes)}
                            style={{ cursor: 'pointer' }}
                            className={classes.Grid}
                        >
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {image ? (
                                        <img
                                            src={image}
                                            style={{
                                                width: '200px',
                                                height: '200px',
                                                margin: '15px 0',
                                                alignSelf: 'center',
                                                justifySelf: 'center',
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={Avatar}
                                            style={{
                                                width: '200px',
                                                height: '200px',
                                                margin: '15px 0',
                                                alignSelf: 'center',
                                                justifySelf: 'center',
                                            }}
                                        />
                                    )}

                                    <Typography
                                        sx={{ mb: 1.5 }}
                                        color="text.secondary"
                                    >
                                        Name: {attributes.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        Joined:{' '}
                                        {new Date(attributes.createdAt)
                                            .toDateString()
                                            .split(' ')
                                            .splice(1, 4)
                                            .join(' ')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                }
            });
        }
    };

    return (
        // TODO: NOVI HEADER
        <Container
            maxWidth="false"
            style={{
                marginTop: '80px',
                fontFamily: 'Comic Neue',
                paddingBottom: '16px',
            }}
            className={classes.Container}
        >
            <div
                style={{
                    marginTop: '100px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                }}
                className={classes.NewGrid}
            >
                <div
                    style={{
                        fontSize: '28px',
                        lineHeight: '32px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: '12px 0',
                    }}
                >
                    {/* {location.pathname.split('/')[2].charAt(0).toUpperCase() +
                        location.pathname.split('/')[2].slice(1)} */}
                    Tesla's team
                </div>
                <div
                    style={{ display: 'flex', alignItems: 'center' }}
                    className={classes.Inputs}
                >
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Sort by</InputLabel>
                        <Select
                            value={sort}
                            label="Sort by"
                            onChange={handleChange}
                        >
                            <MenuItem value={'DESC'}>Last Joined</MenuItem>
                            <MenuItem value={'ASC'}>First Joined</MenuItem>
                            <MenuItem value={'name'}>Name (A-Z) </MenuItem>
                            {/* TODO: Mozda ubaciti obrnuto sortiranje po imenu */}
                            {/* <MenuItem value={'name'}>Name (Z-A) </MenuItem> */}
                        </Select>
                    </FormControl>
                    <TextField
                        id="filter-by-name-team"
                        label="Filter by name"
                        variant="outlined"
                        value={nameFilter}
                        onChange={onNameFilterChange}
                    />
                    {/* <input
                        placeholder="Filter by name"
                        style={{
                            padding: '18px',
                            border: '1px solid black',
                            height: 'fit-content',
                            margin: '10px 0',
                        }}
                        value={nameFilter}
                        onChange={onNameFilterChange}
                    /> */}
                </div>
            </div>
            <Grid container spacing={2} sx={{ marginLeft: 0 }}>
                {data?.length !== 0 && !searching ? (
                    showProfiles(false)
                ) : emptyFilter ? (
                    <div>No profiles found</div>
                ) : searching ? (
                    showProfiles(true)
                ) : (
                    <Spinner />
                )}
                {/* {showProfiles()} */}
            </Grid>
            <Modal
                show={modalOpen}
                modalClosed={closeModal}
                modalInfo={modalInfo}
            />
        </Container>
    );
};

export default UserTeam;
