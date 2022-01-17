import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TeamHeader from './TeamHeader';
import ShowQuestions from './ShowQuestions';
import BasicInfo from './BasicInfo';

const EditProfile = ({ edit }) => {
    const showEdit = () => {
        return (
            <Container sx={{ marginTop: '150px', padding: '0 200px 0 40px' }}>
                <TeamHeader edit={edit} />
                <Grid container direction="row" justifyContent="space-between">
                    <BasicInfo edit={edit} />
                    <ShowQuestions edit={edit} />
                </Grid>
            </Container>
        );
    };

    return <>{showEdit()}</>;
};

export default EditProfile;
