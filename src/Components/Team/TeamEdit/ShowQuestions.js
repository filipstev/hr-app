import {
    Button,
    Divider,
    FormControl,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import axiosInstance from '../../../helpers/axiosInstance';

const ShowQuestions = ({ questions, answers }) => {
    // console.log('Answers(ShowQuestion.js): ', answers[0].id);
    const [putAnswers, setPutAnswers] = useState([...answers]);
    console.log(putAnswers);
    let help = [...putAnswers];

    return (
        <Grid item width="40%" border="1px solid black" padding="10px">
            <FormControl
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={(e) => {
                    e.preventDefault();
                    setPutAnswers([...help]);
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
                        let answer = answers[i];
                        if (!answer) {
                            answer = '';
                        }
                        return (
                            <>
                                <label>{question.attributes.text}</label>
                                <TextField
                                    type={question.attributes.type}
                                    sx={{ margin: '0 0 10px 0' }}
                                    value={answer.attributes.answer}
                                    onInput={(e) => {
                                        help[i].attributes.answer =
                                            e.target.value;
                                        setPutAnswers([...help]);
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

export default ShowQuestions;
