import TeamHeader from './TeamHeader';
import BasicInfo from './EditBasicInfo';
import ShowAnswers from './ShowAnswers';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const EditProfile = ({ edit }) => {
    return (
        <>
            <Container sx={{ marginTop: '150px', padding: '0 40px 0 40px' }}>
                <TeamHeader edit={edit} />
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    rowGap={2}
                >
                    <BasicInfo />
                    <ShowAnswers edit={edit} />
                </Grid>
            </Container>
        </>
    );
};

export default EditProfile;
