import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TeamHeader from './TeamHeader';
import BasicInfo from './EditBasicInfo';
import ShowAnswers from './ShowAnswers';

const EditProfile = ({ edit }) => {
    return (
        <>
            <Container sx={{ marginTop: '150px', padding: '0 200px 0 40px' }}>
                <TeamHeader edit={edit} />
                <Grid container direction="row" justifyContent="space-between">
                    <BasicInfo edit={edit} />
                    <ShowAnswers edit={edit} />
                </Grid>
            </Container>
        </>
    );
};

export default EditProfile;
