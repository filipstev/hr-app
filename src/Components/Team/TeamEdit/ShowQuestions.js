import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';

import {
    Button,
    Divider,
    FormControl,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
//  Triple check everything!
const ShowQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const params = useParams();
    const getQ = () => {
        return axiosInstance.get(`/questions?populate=*&sort[order]=asc`);
    };
    const getA = () => {
        return axiosInstance.get(`/profiles/${params.id}?populate=*`);
    };

    const handleAnswerChange = (inputValue, i) => {
        setAnswers([...answers], (answers[i].attributes.answer = inputValue));
    };

    useEffect(() => {
        Promise.all([getQ(), getA()]).then((res) => {
            const answerhelp = res[1].data.data.attributes.answers.data;
            const questionhelp = res[0].data.data;

            setQuestions([...questionhelp]);

            handleConnectQuestionsAndAnswers(answerhelp, questionhelp);
        });
        return () => {
            console.log('cleanup');
        };
    }, []);

    const handleConnectQuestionsAndAnswers = (answers, questions) => {
        let answersinrow = [];

        questions.forEach((question) => {
            answers.forEach((answer) => {
                question.attributes.answers.data.forEach((answerinq) => {
                    if (answer.id === answerinq.id) {
                        answersinrow.push(answerinq);
                    }
                });
            });
        });
        setAnswers([...answersinrow]);
    };

    const handleAnswerSubmit = () => {
        answers.forEach(({ id, attributes }, i) => {
            if (!id) {
                axiosInstance.post(`/answers`, {
                    data: {
                        answer: attributes.answer,
                        question: questions[i].id,
                        profile: `${params.id}`,
                    },
                });
            } else {
                axiosInstance.put(`/answers/${id}`, {
                    data: {
                        answer: attributes.answer,
                        question: questions[i].id,
                        profile: `${params.id}`,
                    },
                });
            }
        });
    };

    const showQuestionInput = () => {
        return questions.map((question, i) => {
            if (!answers[i]) {
                answers[i] = {
                    attributes: {
                        answer: '',
                    },
                };
            }
            return (
                <>
                    <label>
                        {`Question ${i + 1} - `}
                        {question.attributes.text}
                    </label>
                    <TextField
                        type={question.attributes.type}
                        sx={{ margin: '0 0 10px 0' }}
                        value={answers[i].attributes.answer}
                        onInput={(e) => handleAnswerChange(e.target.value, i)}
                    />
                    <Divider />
                </>
            );
        });
    };

    return (
        <>
            <Grid item width="40%" border="1px solid black" padding="10px">
                <FormControl
                    component="form"
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAnswerSubmit();
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
                    {!answers ? <p>Loading...</p> : showQuestionInput()}
                    <Button
                        variant="outlined"
                        type="submit"
                        sx={{ marginTop: '15px' }}
                    >
                        Save
                    </Button>
                </FormControl>
            </Grid>
        </>
    );
};

export default ShowQuestions;
