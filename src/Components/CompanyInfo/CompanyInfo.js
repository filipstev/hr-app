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
import { useMutation, useQuery } from 'react-query';

const fetchCompanyName = async () => {
    const res = await axiosInstance.get('/companies/2?populate=*');

    // console.log(res.data.data.attributes.name);

    return res.data.data.attributes;
};

const CompanyInfo = () => {
    const [companyName, setCompanyName] = useState(' ');
    const [files, setFiles] = useState([]);

    const updateInfo = async () => {
        if (companyName !== '' && companyName !== ' ') {
            const res = await axiosInstance.put('/companies/2', {
                data: { name: companyName },
            });
            console.log(res);
        }

        if (files.length > 0) {
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

    const { data, status, refetch } = useQuery(['companyName'], () =>
        fetchCompanyName()
    );

    const { mutate: updateCompany } = useMutation(updateInfo);

    useEffect(() => {
        setCompanyName(data?.name);
    }, [data]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Container
                maxWidth="sm"
                style={{
                    marginTop: '82px',
                    padding: '0 30px',
                }}
            >
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                    textAlign="left"
                >
                    <Grid
                        item
                        style={{
                            width: '100%',
                            fontFamily: 'Comic Neue',
                        }}
                    >
                        <div
                            align="left"
                            style={{
                                fontFamily: 'Comic Neue !important',
                                marginBottom: '16px',
                                fontSize: '1.3rem',
                                fontWeight: 'bold',
                            }}
                        >
                            Company Info
                        </div>
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
                            label="Company Name"
                            variant="outlined"
                            fullWidth="true"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <img
                            src={
                                files.length > 0
                                    ? URL.createObjectURL(files[0])
                                    : data?.logo.data.attributes.url
                            }
                            style={{
                                margin: '10px 0',
                                width: '200px',
                                height: 'auto',
                            }}
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
                        onClick={() => updateCompany()}
                    >
                        Save
                    </div>
                </Grid>
            </Container>
        </>
    );
};

export default CompanyInfo;
