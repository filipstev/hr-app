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

const CompanyWall = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState([]);

    useEffect(() => {
        axiosInstance
            .get(
                'https://internship-hr-app.herokuapp.com/api/profiles?filters[company][slug][$eq]=' +
                    location.pathname.split('/')[2] +
                    '&populate=*'
            )
            .then((data) => {
                setProfiles(data.data.data);
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
                image =
                    'https://internship-hr-app.herokuapp.com' +
                    attributes.profilePhoto.data.attributes.url;
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
                                    Joined: {attributes.createdAt}
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
        <Container maxWidth="false" style={{ marginTop: '80px' }}>
            <Grid
                container
                sx={{ marginTop: '100px', justifyContent: 'space-between' }}
            ></Grid>
            <Grid container spacing={2} sx={{ marginLeft: 0 }}>
                {profiles.length !== 0 ? showProfiles() : <p>Loading...</p>}
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
