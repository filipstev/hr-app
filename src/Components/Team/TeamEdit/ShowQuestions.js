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
    // Popraviti answers state kada profil nema odgovora
    const [answers, setAnswers] = useState([]);
    const params = useParams();

    const getQ = () => {
        return axiosInstance.get(`/questions`);
    };

    const getA = () => {
        return axiosInstance.get(`/profiles/${params.id}?populate=*`);
    };

    const handleAnswerChange = (inputValue, i) => {
        setAnswers([...answers], (answers[i].attributes.answer = inputValue));
    };

    useEffect(() => {
        Promise.all([getQ(), getA()]).then((res) => {
            setAnswers([...res[1].data.data.attributes.answers.data]);
            setQuestions([...res[0].data.data]);
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
                    {!answers ? (
                        <p>Loading...</p>
                    ) : (
                        questions.map((question, i) => {
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
                                        {`Question ${i + 1}`} -{' '}
                                        {question.attributes.text}
                                    </label>
                                    <TextField
                                        type={question.attributes.type}
                                        sx={{ margin: '0 0 10px 0' }}
                                        value={answers[i].attributes.answer}
                                        onInput={(e) =>
                                            handleAnswerChange(
                                                e.target.value,
                                                i
                                            )
                                        }
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
    return <>{page()}</>;
};

export default ShowQuestions;
