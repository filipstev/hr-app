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
import { useGetProfile } from '../../../queryFunctions/fetchSingleProfile';
import { useGetQuestions } from '../../../queryFunctions/fetchQuestions';
import { useMutateAnswers } from '../../../hooks/use-mutate-answers';
//  Triple check everything!
const ShowQuestions = () => {
    const { id } = useParams();

    const { data: profile, status: profileStatus } = useGetProfile(id);
    const { data: questions, status: questionStatus } = useGetQuestions();

    const [answers, setAnswers] = useState([]);

    const newAnswer = useMutateAnswers((data) => {
        return axiosInstance.post(`/answers`, data);
    });
    const editAnswer = useMutateAnswers((data) => {
        return axiosInstance.put(`/answers/${data.id}`, data);
    });

    const handleConnectQuestionsAndAnswers = (answers, questions) => {
        let answersinrow = [];
        console.log(answers);
        console.log(questions);
        // questions.forEach((question) => {
        //     answers.forEach((answer) => {
        //         question.attributes.answers.data.forEach((answerinq) => {
        //             if (answer.id === answerinq.id) {
        //                 answersinrow.push(answerinq);
        //             }
        //         });
        //     });
        // });
        // setAnswers([...answersinrow]);
    };

    const handleAnswerChange = (inputValue, i) => {
        // setAnswers([...answers], (answers[i].attributes.answer = inputValue));
    };

    const handleAnswerSubmit = () => {
        // answers.forEach(({ id, attributes }, i) => {
        //     const answerData = {
        //         answer: attributes.answer,
        //         question: questions.data.data[i].id,
        //         profile: `${params.id}`,
        //     };
        //     if (!id) {
        //         newAnswer.mutate({
        //             data: answerData,
        //         });
        //     } else {
        //         editAnswer.mutate({
        //             id: id,
        //             data: answerData,
        //         });
        //     }
        // });
    };
    useEffect(() => {
        profileStatus === 'success' &&
            setAnswers(profile.data.data.attributes.answers.data);
    }, [profileStatus]);

    useEffect(() => {
        if (!!answers.length && questions) {
            handleConnectQuestionsAndAnswers(answers, questions.data.data);
        }
    }, [answers, questions]);

    const ShowQuestionInput = () => {
        return questions.data.data.map((question, i) => {
            // if (!answers[i]) {
            //     answers[i] = {
            //         attributes: {
            //             answer: '',
            //         },
            //     };
            // }
            return (
                profileStatus === 'success' && (
                    <>
                        <label>
                            {`Question ${i + 1} - `}
                            {question.attributes.text}
                        </label>
                        {profileStatus === 'success' && (
                            <TextField
                                key={question.id}
                                type={question.attributes.type}
                                sx={{ margin: '0 0 10px 0' }}
                                value={
                                    !!profile.data.data.attributes.answers.data
                                        .length
                                        ? profile.data.data.attributes.answers
                                              .data[i].attributes.answer
                                        : ''
                                }
                                onInput={(e) => {
                                    profile.data.data.attributes.answers.data[
                                        i
                                    ].attributes.answer = e.target.value;
                                }}
                            />
                        )}
                        <Divider />
                    </>
                )
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
                        // handleAnswerSubmit();
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

                    {questionStatus !== 'success' ? (
                        <p>Loading...</p>
                    ) : (
                        <ShowQuestionInput />
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
        </>
    );
};

export default ShowQuestions;
