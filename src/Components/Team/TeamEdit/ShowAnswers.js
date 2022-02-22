import { Grid, Typography } from '@mui/material';

import EditAnswers from './EditAnswers';

const EditAnswersSection = () => {
    return (
        <>
            <Grid
                item
                sx={{
                    border: '1px solid black',
                    padding: '10px',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 'bold',
                        borderBottom: '1px solid black',
                    }}
                >
                    Answers
                </Typography>
                <br></br>
                <EditAnswers />
            </Grid>
        </>
    );
};

export default EditAnswersSection;
