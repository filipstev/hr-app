import { Grid, Typography } from '@mui/material';

import EditAnswers from './EditAnswers';

const EditAnswersSection = ({
    id,
    answers,
    answersIsLoading,
    questions,
    questionsIsLoading,
}) => {
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
                <EditAnswers
                    id={id}
                    answers={answers}
                    answersIsLoading={answersIsLoading}
                    questions={questions}
                    questionsIsLoading={questionsIsLoading}
                />
            </Grid>
        </>
    );
};

export default EditAnswersSection;
