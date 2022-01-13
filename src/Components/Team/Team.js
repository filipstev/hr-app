import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import axiosInstance from '../../helpers/axiosInstance';

const Team = () => {
    const [profiles, setProfiles] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    let help = [];
    let status = '';
    console.log(params);
    if (params.status !== 'team') {
        status = 'pending';
    } else {
        status = 'published';
    }

    useEffect(() => {
        axiosInstance
            .get(`/profiles?filters[status][$eq]=${status}&sort=id&populate=*`)
            .then(({ data }) => {
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
    }, [status]);
    console.log(profiles);
    const showProfiles = () => {
        return profiles.map(({ id, attributes }) => {
            return (
                <Grid item key={id}>
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
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ textTransform: 'capitalize' }}
                            >
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
                                onClick={() => {
                                    if (status === 'pending') {
                                        navigate(`/team/pending/${id}/edit`);
                                    }
                                    if (status === 'published') {
                                        navigate(`/team/${id}/edit`);
                                    }
                                }}
                            >
                                EDIT
                            </Button>
                            <Button
                                size="small"
                                onClick={(e) => {
                                    axiosInstance
                                        .delete(`/profiles/${id}`)
                                        .then(() => {
                                            setProfiles(
                                                profiles.filter(
                                                    (item) => item.id !== id
                                                )
                                            );
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
                <Typography>
                    {params.status === 'team' ? 'Team' : 'Pending for approval'}
                </Typography>
                <Button>+ Add New Team Member</Button>
            </Grid>
            <Grid container spacing={2} sx={{ marginLeft: 0 }}>
                {profiles.length !== 0 ? showProfiles() : <p>Loading...</p>}
            </Grid>
        </Container>
    );
};

export default Team;
