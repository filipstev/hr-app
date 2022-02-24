import axiosInstance from '../../../helpers/axiosInstance';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
// Custom React Query
import { useGetProfile } from '../../../queryFunctions/fetchSingleProfile';
import { useMutateProfile } from '../../../hooks/use-mutate-profile';

import { FormControl, Grid, TextField, Typography } from '@mui/material';
import UploadButton from '../../Buttons/UploadButton';
import SaveButton from '../../Buttons/SaveButton';

const BasicInfo = () => {
    const queryClient = useQueryClient();

    const { id } = useParams();
    const { data: profile, isLoading } = useGetProfile(id);

    const [username, setUsername] = useState('');

    const image = profile?.attributes.profilePhoto.data;
    const [newImage, setNewImage] = useState('');

    const deleteImageMutation = useMutation(() => {
        return axiosInstance.delete(`/upload/files/${image.id}`);
    });

    const uploadImageMutation = useMutation((imgFile) => {
        return axiosInstance.post(`/upload`, imgFile.image);
    });

    const editProfile = useMutateProfile((data) => {
        return axiosInstance.put(`/profiles/${id}`, data);
    });

    const handleProfileImageUpload = (e) => {
        setNewImage(e.target.files);
    };

    const handleSubmit = async () => {
        editProfile.mutate({
            data: {
                name: username,
            },
            id,
        });

        const image = new FormData();
        image.append('files', newImage[0]);

        const upload = await uploadImageMutation.mutateAsync(
            { image },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['profile', id]);
                },
            }
        );

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
                <label>Profile Img</label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <UploadButton onUpload={handleProfileImageUpload} id={id} />
                    {/* <img
                        style={{ height: '150px', width: '150px' }}
                        src={
                            !newImage
                                ? image.attributes.formats.thumbnail.url
                                : URL.createObjectURL(newImage[0])
                        }
                        alt="123"
                    /> */}
                </div>
                <SaveButton />
            </FormControl>
        </Grid>
    );
};

export default BasicInfo;
