import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    Grid,
    TextField,
    Typography,
} from '@mui/material';

import axiosInstance from '../../../helpers/axiosInstance';

const BasicInfo = () => {
    const { id } = useParams();

    const [username, setUsername] = useState('');
    /* Profile */
    useEffect(() => {
        axiosInstance
            .get(`/profiles/${id}`)
            .then(({ data }) => {
                const name = data.data.attributes.name;
                setUsername(name);
            })
            .catch((err) => console.error(new Error(err)));
        return () => {
            console.log('cleanup');
        };
    }, [id]);

    return (
        <Grid
            item
            justifyContent="start"
            border="1px solid black"
            padding="10px"
        >
            <FormControl style={{ display: 'flex', flexDirection: 'column' }}>
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
                    value={username}
                    onInput={(e) => {
                        setUsername(e.target.value);
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
                                    name: username,
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
    );
};

export default BasicInfo;
