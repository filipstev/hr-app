import {
    Container,
    Grid,
    Link,
    TextField,
    Typography,
    Button,
} from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import axiosInstance from '../../helpers/axiosInstance';
import { useQuery } from 'react-query';

const fetchCompanyName = async () => {
    const res = await axiosInstance.get('/companies/2');

    // console.log(res.data.data.attributes.name);

    return res.data.data.attributes.name;
};

const CompanyInfo = () => {
    const [companyName, setCompanyName] = useState(' ');
    const [files, setFiles] = useState([]);

    const { data, status, refetch } = useQuery(['companyName'], () =>
        fetchCompanyName()
    );

    useEffect(() => {
        axiosInstance
            .get('/companies/2')
            .then((data) => {
                setCompanyName(data.data.data.attributes.name);
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const updateInfo = () => {
        axiosInstance
            .put('/companies/2', {
                data: { name: companyName },
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
                axiosInstance.put('/companies/2', {
                    data: {
                        logo: response.data,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Container maxWidth="sm" style={{ marginTop: '82px' }}>
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                    textAlign="left"
                    fullWidth="true"
                >
                    <Grid item style={{ width: '100%' }}>
                        <Typography align="left">Company Info</Typography>
                    </Grid>
                    <Grid
                        item
                        style={{
                            width: '100%',
                            padding: 0,
                            marginBottom: '12px',
                        }}
                    >
                        <TextField
                            autoFocus
                            defaultValue=" "
                            label="Company Name"
                            variant="outlined"
                            fullWidth="true"
                            value={companyName !== ' ' ? companyName : data}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </Grid>
                    {/* TODO: DODATI UPLOAD INPUT UMESTO OVOG */}
                    <Grid item style={{ width: '100%', padding: 0 }}>
                        <input
                            type="file"
                            onChange={(e) => setFiles(e.target.files)}
                        />
                    </Grid>

                    {/* Ovo dugme je bilo problem :o */}
                    {/* <Button
                        variant="outlined"
                        color="black"
                        style={{ margin: '0 8px' }}
                        onClick={testFn}
                    >
                        SAVE
                    </Button> */}
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
                </Grid>
            </Container>
        </>
    );
};

export default CompanyInfo;
