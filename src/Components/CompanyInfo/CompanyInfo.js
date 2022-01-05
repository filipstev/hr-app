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

const CompanyInfo = () => {
    const testFn = () => {
        axiosInstance
            .get('/profiles')
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
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
                    <Grid item style={{ width: '100%' }}>
                        <TextField
                            label="Company Name"
                            variant="outlined"
                            fullWidth="true"
                        />
                    </Grid>
                    {/* TODO: DODATI UPLOAD INPUT UMESTO OVOG */}
                    <Grid item style={{ width: '100%' }}>
                        <TextField
                            label="Company Logo"
                            variant="outlined"
                            fullWidth="true"
                        />
                    </Grid>
                    <Button
                        variant="outlined"
                        color="black"
                        style={{ margin: '0 8px' }}
                        onClick={testFn}
                    >
                        SAVE
                    </Button>
                </Grid>
            </Container>
        </>
    );
};

export default CompanyInfo;
