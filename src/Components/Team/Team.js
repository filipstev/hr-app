import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import axiosInstance from '../../helpers/axiosInstance';

const Team = ({ status }) => {
    const [profiles, setProfiles] = useState([]);
    const navigate = useNavigate();

    let help = [];

    useEffect(() => {
        axiosInstance
            .get(
                `/profiles?filters[status][$eq]=${status}&sort=id&populate=*&pagination[pageSize]=50`
            )
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

    const month = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    console.log(status);
    const handleFormatDate = (date) => {
        const day = date.getDate();
        const monthInLetters = month[date.getMonth()];
        const year = date.getFullYear();

        const fullDate = `${day}/${monthInLetters}/${year}`;
        return `Joined: ${fullDate}`;
    };

    const showProfiles = () => {
        return profiles.map(({ id, attributes }) => {
            console.log(attributes);
            return (
                <>
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

                                {!attributes.profilePhoto.data ? (
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
                                ) : (
                                    <div
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            margin: '0 auto',
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            src={
                                                attributes.profilePhoto.data
                                                    .attributes.formats.small
                                                    .url
                                            }
                                            alt="profile"
                                        />
                                    </div>
                                )}

                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{ textTransform: 'capitalize' }}
                                >
                                    Name: {attributes.name}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    Status: {attributes.status}
                                </Typography>
                                <Typography variant="body2">
                                    {handleFormatDate(
                                        new Date(attributes.createdAt)
                                    )}
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
                                            navigate(
                                                `/team/pending/${id}/edit`
                                            );
                                        }
                                        if (status === 'published') {
                                            navigate(`/team/${id}/edit`);
                                        }
                                    }}
                                >
                                    {status === 'published'
                                        ? 'EDIT'
                                        : 'DETAILS'}
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
                </>
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
                    {status === 'published' ? 'Team' : 'Pending for approval'}
                </Typography>
                {status === 'published' && (
                    <Button>+ Add New Team Member</Button>
                )}
            </Grid>
            <Grid container spacing={2} sx={{ marginLeft: 0 }}>
                {profiles.length !== 0 ? showProfiles() : <p>Loading...</p>}
            </Grid>
        </Container>
    );
};

export default Team;
