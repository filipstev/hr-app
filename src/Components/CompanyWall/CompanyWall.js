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

const CompanyWall = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [allProfiles, setAllProfiles] = useState([]);
    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState([]);
    const [sort, setSort] = useState('first');
    const [nameFilter, setNameFilter] = useState('');
    const [emptyFilter, setEmptyFilter] = useState(false);

    const handleChange = (e) => {
        setSort(e.target.value);
    };

    const onNameFilterChange = (e) => {
        setNameFilter(e.target.value);
    };

    useEffect(() => {
        let newProfiles = [];
        if (nameFilter !== '') {
            allProfiles.map((profile) => {
                if (profile.attributes.name.includes(nameFilter)) {
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

    useEffect(() => {
        let newProfiles = [];
        if (sort === 'last') {
            let newProfiles = profiles.sort(compareLast);
            setProfiles([...newProfiles]);
        } else if (sort === 'first') {
            let newProfiles = profiles.sort(compareFirst);
            setProfiles([...newProfiles]);
        } else if (sort === 'name') {
            let newProfiles = profiles.sort(compareName);
            setProfiles([...newProfiles]);
        }
    }, [sort]);

    useEffect(() => {
        axiosInstance
            .get(
                'https://internship-hr-app.herokuapp.com/api/profiles?filters[company][slug][$eq]=' +
                    location.pathname.split('/')[2] +
                    '&populate=*'
            )
            .then((data) => {
                let publishedProfiles = [];

                data.data.data.map((profile) => {
                    if (profile.attributes.status === 'published') {
                        publishedProfiles.push(profile);
                    }
                });
                if (publishedProfiles.length === 0) {
                    setEmptyFilter(true);
                }
                setProfiles(publishedProfiles);
                setAllProfiles(publishedProfiles);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [location.pathname]);

    const openModal = (id, attributes) => {
        setModalOpen(true);
        setModalInfo([id, attributes]);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    //TODO: PROVERITI ZA STATUS, DA LI SVE ILI SAMO PUBLISHED
    const showProfiles = () => {
        return profiles.map(({ id, attributes }) => {
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
                                    <div
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            margin: 'auto',
                                        }}
                                    >
                                        {' '}
                                        x
                                    </div>
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
    };

    return (
        // TODO: NOVI HEADER
        <Container
            maxWidth="false"
            style={{ marginTop: '80px', fontFamily: 'Comic Neue' }}
        >
            <Grid
                container
                sx={{
                    marginTop: '100px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    marginBottom: '30px',
                }}
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        placeholder="Filter by name"
                        style={{
                            padding: '18px',
                            border: '1px solid black',
                            height: 'fit-content',
                        }}
                        value={nameFilter}
                        onChange={onNameFilterChange}
                    />
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Sort by</InputLabel>
                        <Select
                            value={sort}
                            label="Sort by"
                            onChange={handleChange}
                        >
                            <MenuItem value={'last'}>Last Joined</MenuItem>
                            <MenuItem value={'first'}>First Joined</MenuItem>
                            <MenuItem value={'name'}>Name (A-Z) </MenuItem>
                            {/* TODO: Mozda ubaciti obrnuto sortiranje po imenu */}
                            {/* <MenuItem value={'name'}>Name (Z-A) </MenuItem> */}
                        </Select>
                    </FormControl>
                </div>
            </Grid>
            <Grid container spacing={2} sx={{ marginLeft: 0 }}>
                {profiles.length !== 0 ? (
                    showProfiles()
                ) : emptyFilter ? (
                    <div>No profiles found</div>
                ) : (
                    <p>Loading...</p>
                )}
            </Grid>
            <Modal
                show={modalOpen}
                modalClosed={closeModal}
                modalInfo={modalInfo}
            />
        </Container>
    );
};

export default CompanyWall;