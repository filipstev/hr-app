import {
    Button,
    Divider,
    FormControl,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../helpers/axiosInstance';

const ShowQuestions = ({ questions, answers }) => {
    // console.log('Answers(ShowQuestion.js): ', answers[0].id);
    const [putAnswers, setPutAnswers] = useState([]);

    useEffect(() => {
        answers.forEach((answer, i) => {
            console.log('Answer: ', answer);
            console.log('Iterator: ', i);
            setPutAnswers(
                [...putAnswers],
                putAnswers.push({
                    id: answer.id,
                    answer: answer.attributes.answer,
                })
            );
            console.log(putAnswers);
        });
        return () => {
            console.log('cleanup');
        };
    }, []);

    const page = () => {
        return (
            <Grid item width="40%" border="1px solid black" padding="10px">
                <FormControl
                    component="form"
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onSubmit={(e) => {
                        e.preventDefault();
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
                    {!questions ? (
                        <p>Loading...</p>
                    ) : (
                        questions.map((question, i) => {
                            // let answer = { ...answers[i] };
                            // console.log(answer);
                            // if (!answer) {
                            //     answer = '';
                            // }

                            return (
                                <>
                                    <label>{question.attributes.text}</label>
                                    <TextField
                                        type={question.attributes.type}
                                        sx={{ margin: '0 0 10px 0' }}
                                        value={putAnswers[i].answer}
                                        onChange={(e) => {
                                            console.log(putAnswers[i]);
                                        }}
                                    />
                                    <Divider />
                                </>
                            );
                        })
                    )}
                    <Button
                        variant="outlined"
                        type="submit"
                        sx={{ marginTop: '15px' }}
                    >
                        Save
                    </Button>
                </FormControl>
            </Grid>
        );
    };
    return <>{putAnswers ? page() : <p>Loading...</p>}</>;
};

export default ShowQuestions;
