import axiosInstance from '../../../helpers/axiosInstance';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    Grid,
    TextField,
    Typography,
} from '@mui/material';

const BasicInfo = () => {
    const { id } = useParams();

    const [username, setUsername] = useState('');
    const [image, setImage] = React.useState(null);
    let asd;
    /* Profile */
    useEffect(() => {
        axiosInstance
            .get(`/profiles/${id}?populate=*`)
            .then(({ data }) => {
                console.log(data.data.attributes);
                const name = data.data.attributes.name;
                setUsername(name);
                setImage(
                    data.data.attributes.profilePhoto.data.attributes.data
                        .formats.small.url
                );
            })
            .catch((err) => console.error(new Error(err)));

        return () => {
            console.log('cleanup');
        };
    }, [id]);
    console.log(image);
    return (
        <Grid
            item
            justifyContent="start"
            border="1px solid black"
            padding="10px"
        >
            <img
                style={{
                    height: '45px',
                    width: '45px',
                }}
                src={image}
                alt="profile"
            />
            <FormControl sx={{ display: 'flex', flexDirection: 'column' }}>
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
