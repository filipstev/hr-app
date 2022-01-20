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
import DeleteProfile from './DeleteProfile';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '../../store/reducers/team';

const Team = ({ status }) => {
    // const [profiles, setProfiles] = useState([]);
    const navigate = useNavigate();
    const [link, setLink] = useState(false);
    const [slug, setSlug] = useState({});
    const profiles = useSelector((state) => state.profiles.profiles);
    const pageNumber = useSelector((state) => state.profiles.pageNumber);
    let num = 1;
    console.log('PAGENUMBER: ', pageNumber);
    const dispatch = useDispatch();
    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem('user'));
        let help = [];
        // Get company slug for "add team member"
        axiosInstance
            .get(
                '/profiles?filters[user][id][$eq]=' +
                    userStorage.user.id +
                    '&populate=*'
            )
            .then((data) => {
                setSlug(
                    data.data.data[0].attributes.company.data.attributes.slug
                );
            })
            .catch((err) => {
                console.log(err);
            });
        // Get profiles for the page
        axiosInstance
            .get(
                `/profiles?filters[status][$eq]=${status}&sort=createdAt&populate=*&pagination[page]=${num}`
            )
            .then(({ data }) => {
                data.data.forEach((item) => {
                    help.push(item);
                });
                dispatch({
                    type: ACTIONS.FETCH_PROFILES,
                    fetchedProfiles: help,
                });
                dispatch({
                    type: ACTIONS.PAGE_NUMBER,
                    pageNumber: data.meta.pagination.pageCount,
                });
            })
            .catch((err) => {
                console.log(new Error(err));
            });
        return () => {
            help = [];
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

    const handleFormatDate = (date) => {
        const day = date.getDate();
        const monthInLetters = month[date.getMonth()];
        const year = date.getFullYear();

        const fullDate = `${day}/${monthInLetters}/${year}`;
        return `Joined: ${fullDate}`;
    };

    const handlePageNumber = () => {
        for (let i = 0; i < num; i++) {
            return <p>{i + 1}</p>;
        }
    };
    const showProfiles = () => {
        return profiles.map(({ id, attributes }) => {
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
                                                    .attributes.formats
                                                    .thumbnail.url
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
                                        DeleteProfile(id).then(() => {
                                            // setProfiles(
                                            //     profiles.filter(
                                            //         (item) => item.id !== id
                                            //     )
                                            // );
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
                {handlePageNumber()}
                {status === 'published' && (
                    <Button
                        onClick={() => {
                            setLink(!link);
                            dispatch({ type: ACTIONS.FETCH_PROFILES });

                            console.log(slug);
                        }}
                    >
                        + Add New Team Member
                    </Button>
                )}
                {link && <p>{`localhost:3000/register/${slug}`}</p>}
            </Grid>
            <Grid container spacing={2} sx={{ marginLeft: 0 }}>
                {profiles ? showProfiles() : <p>Loading...</p>}
            </Grid>
        </Container>
    );
};

export default Team;
