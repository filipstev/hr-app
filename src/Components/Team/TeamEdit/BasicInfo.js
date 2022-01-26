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
import { useGetProfile } from '../../../queryFunctions/fetchSingleProfile';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useMutation } from 'react-query';
import { useMutateProfile } from '../../../hooks/use-mutate-profile';

const BasicInfo = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetProfile(id);

    const [username, setUsername] = useState('');
    const [image, setImage] = useState('');
    const [newImage, setNewImage] = useState('');

    const deleteImageMutation = useMutation(() => {
        return axiosInstance.delete(`/upload/files/${image.id}`);
    });

    const uploadImageMutation = useMutation((imgFile) => {
        return axiosInstance.post(`/upload`, imgFile.newImage);
    });

    /* Profile */
    const editProfile = useMutateProfile((data) => {
        return axiosInstance.put(`/profiles/${id}`, data);
    });

    useEffect(() => {
        !isLoading && setUsername(data.data.data.attributes.name);
        !isLoading && setImage(data.data.data.attributes.profilePhoto.data);
    }, [isLoading]);

    const handleSubmit = () => {
        // if (image) {
        //     deleteImageMutation.mutate({});
        // }

        // uploadImageMutation.mutate({ newImage });

        // !uploadImageMutation.isSuccess &&
        editProfile.mutate({
            data: {
                name: username,
                profilePhoto: `239`,
            },
            id,
        });

        // uploadImageMutation.isSuccess &&
        //     editProfile.mutate({
        //         data: {
        //             name: username,
        //             profilePhoto: `${uploadImageMutation.data.data[0].id}`,
        //         },
        //         id,
        //     });
    };
    return (
        <Grid
            item
            justifyContent="start"
            border="1px solid black"
            padding="10px"
        >
            <div>
                {editProfile.isLoading
                    ? 'Chaning Username'
                    : 'Username Changed'}
            </div>
            <FormControl
                sx={{ display: 'flex', flexDirection: 'column' }}
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
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
                >
                    Save
                </Button>
            </FormControl>
            <ReactQueryDevtools />
        </Grid>
    );
};

export default BasicInfo;
