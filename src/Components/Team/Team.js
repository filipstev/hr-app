import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import DeleteProfile from './DeleteProfile';
import { useProfiles } from '../../queryFunctions/fetchProfiles';

const Team = ({ status }) => {
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const profileQuery = useProfiles(status, page);
    const navigate = useNavigate();
    const [link, setLink] = useState(false);

    useEffect(() => {
        profileQuery.status === 'success' &&
            setPageCount(profileQuery.data.data.meta.pagination.pageCount);
    }, [profileQuery]);

    useEffect(() => {
        setPage(1);
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

    const ShowProfiles = () => {
        return profileQuery.data.data.data.map(({ id, attributes }) => {
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
                                        DeleteProfile(id);
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
                    <Button
                        onClick={() => {
                            setLink(!link);
                            // console.log(slug);
                        }}
                    >
                        + Add New Team Member
                    </Button>
                )}
            </Grid>

            <Pagination
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                count={pageCount}
                onChange={(e) => setPage(e.target.innerText)}
            />
            <Grid container spacing={2} sx={{ marginLeft: 0 }}>
                {profileQuery.status === 'success' ? (
                    <ShowProfiles />
                ) : (
                    <p>Loading...</p>
                )}
            </Grid>

            <Pagination
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                count={pageCount}
                onClick={(e) => setPage(+e.target.innerText)}
            />
        </Container>
    );
};

export default Team;
