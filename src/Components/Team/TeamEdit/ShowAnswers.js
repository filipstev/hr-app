import { Grid, Typography } from '@mui/material';

import EditAnswers from './EditAnswers';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/theme-context';
const EditAnswersSection = ({
    id,
    answers,
    answersIsLoading,
    questions,
    questionsIsLoading,
}) => {
    const { theme } = useContext(ThemeContext);
    const border = theme === 'light' ? '1px solid black ' : '1px solid white';
    return (
        <>
            <Grid
                item
                sx={{
                    border: border,
                    padding: '10px',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 'bold',
                        borderBottom: border,
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
