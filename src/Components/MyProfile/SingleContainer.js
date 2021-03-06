import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import axiosInstance from '../../helpers/axiosInstance';
import { useMutation } from 'react-query';
import Avatar from '../../assets/avatar.png';
import classes from './MyProfile.module.css';
import Spinner from '../Spinner.js/Spinner';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SaveButton from '../Buttons/SaveButton';
import { ThemeContextProvider } from '../../context/theme-context';
import { ThemeContext } from '../../context/theme-context';

const Input = styled('input')({
    display: 'none',
});
const SingleContainer = (props) => {
    const [name, setName] = useState('');
    const [files, setFiles] = useState([]);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [shouldSpin, setShouldSpin] = useState(false);

    const { theme } = useContext(ThemeContext);

    const updateInfo = async () => {
        setShouldSpin(true);
        await axiosInstance
            .put('/profiles/' + props.user.id, {
                data: { name: name },
            })
            .then(() => {
                setShouldSpin(false);
            })
            .catch((e) => {
                setShouldSpin(false);
            });

        if (files.length > 0) {
            const formData = new FormData();

            formData.append('files', files[0]);

            axiosInstance
                .post('/upload', formData)
                .then((response) => {
                    console.log(response);
                    axiosInstance
                        .put('/profiles/' + props.user.id, {
                            data: {
                                profilePhoto: response.data,
                            },
                        })
                        .then(() => {
                            setShouldSpin(false);
                        })
                        .catch((e) => {
                            setShouldSpin(false);
                        });
                })
                .catch((error) => {
                    setShouldSpin(false);

                    console.log(error);
                });
        }
    };

    const { mutate: updateUser } = useMutation(updateInfo);

    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem('user'));
        console.log(props.user);
        // KAD NADJEMO PASSWORD
        // if (props.user.id) {
        //     axiosInstance
        //         .get('/users/' + userStorage.user.id)
        //         .then((data) => {
        //             console.log(data.data);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // }

        if (props.user) {
            setName(props.user?.attributes ? props.user?.attributes.name : '');
        }
    }, [props.user]);

    const updatePassword = () => {
        const userStorage = JSON.parse(localStorage.getItem('user'));
        axiosInstance
            .put('/users/' + userStorage.user.id, { data: {} })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const uploadImage = async () => {
        const formData = new FormData();

        formData.append('files', files[0]);

        axiosInstance
            .post('/upload', formData)
            .then((response) => {
                console.log(response);
                axiosInstance.put('/profiles/' + props.user.id, {
                    data: {
                        profilePhoto: response.data,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (!props.user) {
        return props.info ? <Spinner /> : null;
    }

    return props.info ? (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                // padding: '20px 0px 20px 0px',
                border:
                    theme === 'light' ? '1px solid black' : '1px solid white',
                fontFamily: 'Comic Neue',
                fontWeight: '600',
                marginRight: '40px',
                width: '370px',
                marginBottom: '14px',
            }}
            className={classes.SingleContainer}
        >
            <div style={{ padding: '10px 20px' }}>Basic Info</div>
            {!shouldSpin ? (
                <div
                    style={{
                        borderTop:
                            theme === 'light'
                                ? '1px solid black'
                                : '1px solid white',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                    }}
                >
                    <TextField
                        variant="outlined"
                        label="Name"
                        style={{ marginBottom: '15px', marginTop: '12px' }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {props.user?.attributes.profilePhoto?.data?.attributes
                        .url ? (
                        <img
                            src={
                                files.length > 0
                                    ? URL.createObjectURL(files[0])
                                    : props.user?.attributes.profilePhoto.data
                                          .attributes.url
                            }
                            style={{
                                height: '200px',
                                width: '200px',
                                objectFit: 'cover',
                                marginBottom: '16px',
                            }}
                        />
                    ) : (
                        <img
                            src={Avatar}
                            style={{
                                height: '200px',
                                width: '200px',
                                objectFit: 'cover',
                                marginBottom: '16px',
                            }}
                        />
                    )}
                    <label
                        htmlFor="icon-button-file"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: 'fit-content',
                            cursor: 'pointer',
                        }}
                    >
                        <Input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            onChange={(e) => setFiles(e.target.files)}
                        />
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <PhotoCamera />
                        </IconButton>
                        <span style={{ marginLeft: '2px' }}>Upload</span>
                    </label>
                    {/* <input type="file" onChange={(e) => setFiles(e.target.files)} /> */}

                    <div
                        style={{
                            width: 'fit-content',
                            marginTop: '30px',
                            alignSelf: 'flex-end',
                            cursor: 'pointer',
                        }}
                        onClick={() => updateUser()}
                    >
                        <SaveButton />
                    </div>
                </div>
            ) : (
                <div style={{ marginBottom: '60px' }}>
                    <Spinner />
                </div>
            )}
        </div>
    ) : (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                // padding: '20px 0px 20px 0px',
                border:
                    theme === 'light' ? '1px solid black' : '1px solid white',
                fontFamily: 'Comic Neue',
                fontWeight: '600',
                marginRight: '40px',
                width: '370px',
            }}
            className={classes.SingleContainer}
        >
            <div style={{ padding: '10px 20px' }}>Security</div>
            <div
                style={{
                    borderTop:
                        theme === 'light'
                            ? '1px solid black'
                            : '1px solid white',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                }}
            >
                <div style={{ fontWeight: '500' }}>
                    <div>Email</div>
                    <div>{props.email}</div>
                </div>
                <TextField
                    variant="outlined"
                    label="Current password"
                    style={{ marginBottom: '15px', marginTop: '12px' }}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="New Password"
                    style={{
                        marginBottom: '15px',
                        marginTop: '12px',
                    }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                {/* <Button /> */}

                <div
                    style={{
                        width: 'fit-content',
                        marginTop: '20px',
                        alignSelf: 'flex-end',
                        cursor: 'pointer',
                    }}
                >
                    <SaveButton />
                </div>
            </div>
        </div>
    );
};

export default SingleContainer;
