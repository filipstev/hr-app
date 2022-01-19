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
    const [image, setImage] = useState('');
    const [newImage, setNewImage] = useState('');
    /* Profile */
    useEffect(() => {
        axiosInstance
            .get(`/profiles/${id}?populate=*`)
            .then(({ data }) => {
                const name = data.data.attributes.name;
                const imageID = data.data.attributes.profilePhoto.data;
                setUsername(name);
                setImage(imageID);
            })
            .catch((err) => console.error(new Error(err)));

        return () => {
            console.log('cleanup');
        };
    }, [id]);

    const handleChangeImage = async () => {
        if (image !== null) {
            axiosInstance.delete(`/upload/files/${image.id}`);
        }
        const uploadAndConnectNewImage = await axiosInstance.post(
            `/upload`,
            newImage
        );

        if (uploadAndConnectNewImage.status === 200) {
            const imgid = uploadAndConnectNewImage.data[0].id;
            console.log(imgid);
            axiosInstance.put(`/profiles/${id}`, {
                data: {
                    profilePhoto: `${imgid}`,
                },
            });
        }
    };

    return (
        <Grid
            item
            justifyContent="start"
            border="1px solid black"
            padding="10px"
        >
            <FormControl
                sx={{ display: 'flex', flexDirection: 'column' }}
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleChangeImage();
                }}
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
                    value={username}
                    onInput={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <label>Upload Img</label>
                <TextField
                    type="file"
                    onInput={(e) => {
                        const image = new FormData();
                        image.append('files', e.target.files[0]);

                        setNewImage(image);
                    }}
                />
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
