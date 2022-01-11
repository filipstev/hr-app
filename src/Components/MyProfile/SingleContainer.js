import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import axiosInstance from '../../helpers/axiosInstance';

const SingleContainer = (props) => {
    const [name, setName] = useState('');
    const [files, setFiles] = useState([]);
    useEffect(() => {
        setName(props.user.attributes ? props.user.attributes.name : '');
        console.log(props.user.attributes);
    }, [props.user]);

    const updateInfo = () => {
        axiosInstance
            .put('/profiles/' + props.user.id, {
                data: { name: name },
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });

        if (files.length > 0) {
            uploadImage();
        }
    };

    const uploadImage = async () => {
        const formData = new FormData();

        formData.append('files', files[0]);

        axiosInstance
            .post('/upload', formData)
            .then((response) => {
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

    return props.info ? (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                // padding: '20px 0px 20px 0px',
                border: '1px solid black',
                fontFamily: 'Comic Neue',
                fontWeight: '600',
                marginRight: '40px',
                width: '370px',
            }}
        >
            <div style={{ padding: '10px 20px' }}>Basic Info</div>
            <div
                style={{
                    borderTop: '1px solid black',
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
                <input type="file" onChange={(e) => setFiles(e.target.files)} />
                {/* <Button /> */}

                <div
                    style={{
                        border: '1px solid black',
                        borderRadius: '4px',
                        width: 'fit-content',
                        padding: '3px 20px',
                        marginTop: '30px',
                        alignSelf: 'flex-end',
                        cursor: 'pointer',
                    }}
                    onClick={updateInfo}
                >
                    Save
                </div>
            </div>
        </div>
    ) : (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                // padding: '20px 0px 20px 0px',
                border: '1px solid black',
                fontFamily: 'Comic Neue',
                fontWeight: '600',
                marginRight: '40px',
                width: '370px',
            }}
        >
            <div style={{ padding: '10px 20px' }}>Security</div>
            <div
                style={{
                    borderTop: '1px solid black',
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
                />
                <TextField
                    variant="outlined"
                    label="New Password"
                    style={{ marginBottom: '15px', marginTop: '12px' }}
                />

                {/* <Button /> */}

                <div
                    style={{
                        border: '1px solid black',
                        borderRadius: '4px',
                        width: 'fit-content',
                        padding: '3px 20px',
                        marginTop: '20px',
                        alignSelf: 'flex-end',
                        cursor: 'pointer',
                    }}
                >
                    Save
                </div>
            </div>
        </div>
    );
};

export default SingleContainer;
