import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Container, Typography } from '@mui/material';

const EditProfile = () => {
    const [profile, setProfile] = useState();
    const [questions, setQuestions] = useState();
    const params = useParams();
    const [firstTime, setFirstTime] = useState(true);
    const { id } = params;

    const getUserProfile = () => {
        return axiosInstance.get(`/profiles/${id}`);
    };
    const getUserQuestions = () => {
        return axiosInstance.get('/questions');
    };

    useEffect(() => {
        if (firstTime) {
            Promise.all([getUserProfile(), getUserQuestions()])
                .then((results) => {
                    const userProfile = results[0].data.data.attributes;
                    const userQuestions = results[1].data.data;
                    setProfile({ ...userProfile });
                    setQuestions([...userQuestions]);
                })
                .catch((err) => {
                    console.log(new Error(err));
                });
            return () => {
                console.log('cleanup');
            };
        }
    }, []);

    const showEdit = () => {
        console.log('Profile:', profile);
        console.log('questions:', questions);

        console.log(Object.values(questions));
        questions.map((item) => {
            return console.log('Question: ', item.attributes.text);
        });

        return (
            <Container
                style={{ marginTop: '150px', padding: '0 200px 0 40px' }}
            >
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="p">Edit Team Member</Typography>
                    </Grid>
                    <Grid item>
                        <FormControl
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <InputLabel id="demo-simple-select-label">
                                Status
                            </InputLabel>
                            <Select
                                style={{ paddingLeft: '16px' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Status"
                                value={profile.status}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                }}
                            >
                                <MenuItem value={'published'}>
                                    Published
                                </MenuItem>
                                <MenuItem value={'pending'}>Pending</MenuItem>
                            </Select>
                            <Button variant="outlined">Delete</Button>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent={'space-between'}
                >
                    <Grid item>
                        <form
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <p>Basic Info</p>
                            <br></br>
                            <label>Name</label>
                            <input type="text" value={profile.name} />
                            <label>Upload Img</label>
                            <input type="file" />
                            <button>Save</button>
                        </form>
                    </Grid>

                    <Grid item>
                        <form
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <p>Answers</p>
                            <br></br>
                            <label>Question 1</label>
                            <input type="text" placeholder="Yes i have Doggo" />
                            <label>Question 2</label>
                            <input
                                type="text"
                                placeholder="Yes i have Doggo2"
                            />
                            <label>CHRISTMASS IMG IS A MUST</label>
                            <input type="file" />
                            <button>Save</button>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        );
    };
    return <>{profile ? showEdit() : <p>Loading</p>}</>;
};

export default EditProfile;
