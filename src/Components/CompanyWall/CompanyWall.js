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
import classes from './CompanyWall.module.css';
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

const CompanyWall = () => {
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

    const compare = (a, b) => {
        if (order === 'DESC') {
            compareLast(a, b);
        } else if (order === 'ASC') {
            compareFirst(a, b);
        } else if (order === 'name') {
            compareName(a, b);
        } else {
            console.log('nothing');
        }
    };

    const fetchProfiles = async (slug, order) => {
        let res;
        if (order === 'name') {
            res = await axiosInstance.get(
                '/profiles?filters[company][slug][$eq]=' +
                    slug +
                    '&populate=*&sort=name:ASC&pagination[pageSize]=50&filters[status][$eq]=published'
            );
        } else {
            res = await axiosInstance.get(
                '/profiles?filters[company][slug][$eq]=' +
                    slug +
                    '&populate=*&sort=createdAt:' +
                    order +
                    '&pagination[pageSize]=50&filters[status][$eq]=published'
            );
        }

        console.log(res.data.data.length === 0);

        if (res.data.data === []) {
            return [];
        }
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

    const { data, status, refetch } = useQuery(
        ['team-profiles', location.pathname.split('/')[2], order],
        () => fetchProfiles(location.pathname.split('/')[2], order)
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

    // useEffect(() => {
    //     let newProfiles = [];
    //     if (sort === 'last') {
    //         let newProfiles = profiles.sort(compareLast);
    //         setProfiles([...newProfiles]);
    //     } else if (sort === 'first') {
    //         let newProfiles = profiles.sort(compareFirst);
    //         setProfiles([...newProfiles]);
    //     } else if (sort === 'name') {
    //         let newProfiles = profiles.sort(compareName);
    //         setProfiles([...newProfiles]);
    //     }
    // }, [sort]);

    // useEffect(() => {
    //     axiosInstance
    //         .get(
    //             '/profiles?filters[company][slug][$eq]=' +
    //                 location.pathname.split('/')[2] +
    //                 '&populate=*'
    //         )
    //         .then((data) => {
    //             let publishedProfiles = [];

    //             data.data.data.map((profile) => {
    //                 if (profile.attributes.status === 'published') {
    //                     publishedProfiles.push(profile);
    //                 }
    //             });
    //             if (publishedProfiles.length === 0) {
    //                 setEmptyFilter(true);
    //             }
    //             setProfiles(publishedProfiles);
    //             setAllProfiles(publishedProfiles);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [location.pathname]);

    const openModal = (id, attributes) => {
        setModalOpen(true);
        setModalInfo([id, attributes]);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

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
                                                backgroundColor: 'white',
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
            return profiles
                ?.sort((a, b) => compare(a, b))
                .map(({ id, attributes }) => {
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

    if (status === 'loading') {
        return <Spinner />;
    }

    if (data.length === 0) {
        return (
            <div
                style={{
                    marginTop: '80px',
                    margin: '80px auto',
                    textAlign: 'center',
                }}
            >
                No company found
            </div>
        );
    }

    return (
        // TODO: NOVI HEADER
        <Container
            maxWidth="false"
            style={{
                marginTop: '80px',
                fontFamily: 'Comic Neue',
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
                    }}
                >
                    {location.pathname.split('/')[2].charAt(0).toUpperCase() +
                        location.pathname.split('/')[2].slice(1)}
                    's team
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
                        id="filter-by-name"
                        label="Filter by name"
                        variant="outlined"
                        value={nameFilter}
                        onChange={onNameFilterChange}
                        className={classes.FilterName}
                    />

                    {/* <input
                        placeholder="Filter by name"
                        style={{
                            padding: '18px',
                            border: '1px solid black',
                            height: 'fit-content',
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
                slug={location.pathname.split('/')[2]}
            />
        </Container>
    );
};

export default CompanyWall;
