import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Container, Divider, Typography } from '@mui/material';

const EditProfile = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState();
    const [userStatus, setUserStatus] = useState('');
    const [userImage, setUserImage] = useState();

    const [questions, setQuestions] = useState();
    const params = useParams();
    const { id } = params;

    const getUserProfile = () => {
        return axiosInstance.get(`/profiles/${id}?populate=*`);
    };

    const getUserQuestions = () => {
        return axiosInstance.get('/questions');
    };

    useEffect(() => {
        Promise.all([getUserProfile(), getUserQuestions()])
            .then((results) => {
                const userProfile = results[0].data.data.attributes;
                const userQuestions = results[1].data.data;
                setUserName(userProfile.name);
                setUserStatus(userProfile.status);
                setQuestions([...userQuestions]);
            })
            .catch((err) => {
                console.log(new Error(err));
            });

        return () => {
            console.log('cleanup');
        };
    }, []);

    const showEdit = () => {
        // console.log('Profile:', profile);
        // console.log('Questions:', questions);
        console.log('Username: ', userName);
        console.log('Status: ', userStatus);
        // Answers EndPoint
        // console.log('Looking for answers: ', profile.answers.data);

        return (
            <Container
                style={{ marginTop: '150px', padding: '0 200px 0 40px' }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    paddingBottom="25px"
                >
                    <Grid item alignItems="center" display="flex">
                        <Typography sx={{ fontWeight: 'bold' }}>
                            Edit Team Member
                        </Typography>
                    </Grid>
                    <Grid item display="flex" justifyContent="flex-end">
                        <FormControl
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <InputLabel id="demo-simple-select-label">
                                Status
                            </InputLabel>
                            <Select
                                style={{ paddingLeft: '16px' }}
                                labelId="selectStatus"
                                id="selectStatus"
                                label="Status"
                                value={userStatus}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    axiosInstance
                                        .put(`/profiles/${id}`, {
                                            data: {
                                                status: e.target.value,
                                            },
                                        })
                                        .then(() => {
                                            setUserStatus(e.target.value);
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                        });
                                }}
                            >
                                <MenuItem value={'published'}>
                                    Published
                                </MenuItem>
                                <MenuItem value={'pending'}>Pending</MenuItem>
                            </Select>
                            <Button
                                variant="outlined"
                                onClick={(e) => {
                                    axiosInstance.delete(`/profiles/${id}`);
                                    navigate('/profiles');
                                }}
                            >
                                Delete
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent={'space-between'}
                >
                    {/* Profile */}
                    <Grid
                        item
                        justifyContent="start"
                        border="1px solid black"
                        padding="10px"
                    >
                        <FormControl
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 'bold',
                                    borderBottom: '1px solid black',
                                }}
                            >
                                Basic Info
                            </Typography>

                            <label>Name</label>
                            <TextField
                                type="text"
                                value={userName}
                                onInput={(e) => {
                                    setUserName(e.target.value);
                                }}
                            />
                            <label>Upload Img</label>
                            <TextField type="file" />
                            <Button
                                variant="outlined"
                                type="submit"
                                sx={{ marginTop: '15px' }}
                                onClick={(e) => {
                                    axiosInstance
                                        .put(`/profiles/${id}`, {
                                            data: {
                                                name: userName,
                                            },
                                        })
                                        .catch((err) => {
                                            console.error(new Error(err));
                                        });
                                }}
                            >
                                Save
                            </Button>
                        </FormControl>
                    </Grid>
                    {/* Questions */}
                    <Grid
                        item
                        width="40%"
                        border="1px solid black"
                        padding="10px"
                    >
                        <FormControl
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 'bold',
                                    borderBottom: '1px solid black',
                                }}
                            >
                                Answers
                            </Typography>
                            <br></br>
                            {!questions ? (
                                <p>Loading...</p>
                            ) : (
                                questions.map((question) => (
                                    <>
                                        <label>
                                            {question.attributes.text}
                                        </label>
                                        <TextField
                                            type={question.attributes.type}
                                            sx={{ margin: '0 0 10px 0' }}
                                        />
                                        <Divider />
                                    </>
                                ))
                            )}
                            <Button
                                variant="outlined"
                                type="submit"
                                sx={{ marginTop: '15px' }}
                            >
                                Save
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
        );
    };

    return (
        <>
            {userName ? (
                showEdit()
            ) : (
                <p style={{ marginTop: '150px' }}>Loading...</p>
            )}
        </>
    );
};

export default EditProfile;
