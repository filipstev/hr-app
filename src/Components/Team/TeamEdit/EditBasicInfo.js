import axiosInstance from '../../../helpers/axiosInstance';

import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
// Custom React Query
import { useGetProfile } from '../../../queryFunctions/fetchSingleProfile';
import { useMutateProfile } from '../../../hooks/use-mutate-profile';

import {
    Button,
    FormControl,
    Grid,
    TextField,
    Typography,
} from '@mui/material';

const BasicInfo = ({ edit }) => {
    const { id } = useParams();
    const { data: profile, isLoading } = useGetProfile(id);
    console.log(profile);
    const [username, setUsername] = useState('');

    const image = profile?.attributes.profilePhoto.data;
    const [newImage, setNewImage] = useState('');

    const deleteImageMutation = useMutation(() => {
        return axiosInstance.delete(`/upload/files/${image.id}`);
    });

    const uploadImageMutation = useMutation((imgFile) => {
        return axiosInstance.post(`/upload`, imgFile.newImage);
    });

    const editProfile = useMutateProfile((data) => {
        return axiosInstance.put(`/profiles/${id}`, data);
    });

    const handleSubmit = async () => {
        editProfile.mutate({
            data: {
                name: username,
            },
            id,
        });

        const upload = await uploadImageMutation.mutateAsync({ newImage });

        if (upload.status) {
            deleteImageMutation.mutate({});
            editProfile.mutate({
                data: {
                    profilePhoto: `${upload.data[0].id}`,
                },
                id,
            });
        }
    };

    useEffect(() => {
        !isLoading && setUsername(profile.attributes.name);
    }, [isLoading, profile]);

    if (isLoading) {
        return <p>Profile is Loading</p>;
    }
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
                <div>
                    {!editProfile.isSuccess
                        ? 'Chaning Username'
                        : 'Username Changed'}
                </div>
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
        </Grid>
    );
};

export default BasicInfo;
