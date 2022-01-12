import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TeamHeader from './TeamHeader';
import ShowQuestions from './ShowQuestions';
import BasicInfo from './BasicInfo';

const EditProfile = () => {
    const showEdit = () => {
        return (
            <Container
                style={{ marginTop: '150px', padding: '0 200px 0 40px' }}
            >
                <TeamHeader />
                <Grid container direction="row" justifyContent="space-between">
                    <BasicInfo />
                    <ShowQuestions />
                </Grid>
            </Container>
        );
    };

    return <>{showEdit()}</>;
};

export default EditProfile;
