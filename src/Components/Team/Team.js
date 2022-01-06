import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helpers/axiosInstance';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

const Team = () => {
    const [profiles, setProfiles] = useState([]);
    const [firstTime, setFirstTime] = useState(true);

    const navigate = useNavigate();

    let help = [];

    useEffect(() => {
        if (firstTime) {
            axiosInstance
                .get('/profiles?sort=id')
                .then(({ data }) => {
                    setFirstTime(false);
                    data.data.forEach((item) => {
                        help.push(item);
                    });
                    setProfiles([...help]);
                })
                .catch((err) => {
                    console.log(new Error(err));
                });
            return () => {
                console.log('cleanup');
            };
        }
    }, [firstTime]);

    const showProfiles = () => {
        return profiles.map(({ id, attributes }) => {
            return (
                <Grid item>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                ID: {id}
                            </Typography>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    width: '200px',
                                    height: '200px',
                                    margin: '0 auto',
                                    lineHeight: '200px',
                                }}
                            >
                                Image Goes Here
                            </Typography>
                            <Typography variant="h5" component="div">
                                Status: {attributes.status}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Name: {attributes.name}
                            </Typography>
                            <Typography variant="body2">
                                Joined: {attributes.createdAt}
                            </Typography>
                        </CardContent>
                        <CardActions
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                size="small"
                                onClick={() => navigate(`/team/${id}/edit`)}
                            >
                                EDIT
                            </Button>
                            <Button
                                size="small"
                                onClick={(e) => {
                                    axiosInstance
                                        .delete(`/profiles/${id}`)
                                        .then(() => {
                                            setFirstTime(true);
                                        });
                                }}
                            >
                                DELETE
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            );
        });
    };
    return (
        <Container maxWidth="false">
            <Grid
                container
                sx={{ marginTop: '100px', justifyContent: 'space-between' }}
            >
                <Typography>Team</Typography>
                <Button>+ Add New Team Member</Button>
            </Grid>
            <Grid container spacing={2} sx={{ marginLeft: 0 }}>
                {profiles.length !== 0 ? showProfiles() : <p>Loading</p>}
            </Grid>
        </Container>
    );
};

export default Team;
