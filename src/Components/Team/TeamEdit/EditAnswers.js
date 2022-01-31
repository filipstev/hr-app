import { useParams } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import { Button, Divider, TextField, FormControl } from '@mui/material';

import { useGetQuestions } from '../../../queryFunctions/fetchQuestions';
import { useMutateAnswers } from '../../../hooks/use-mutate-answers';
import { useGetAnswersOfProfile } from '../../../queryFunctions/fetchAnswers';
import { useEffect, useState } from 'react';

const EditAnswers = () => {
    const { id } = useParams();

    const {
        data: answers,
        status: answerStatus,
        isLoading: answersIsLoading,
    } = useGetAnswersOfProfile(id);

    const {
        data: questions,
        status: questionStatus,
        isLoading: questionsIsLoading,
    } = useGetQuestions();

    const [answerArray, setAnswerArray] = useState([]);

    const newAnswer = useMutateAnswers((data) => {
        return axiosInstance.post(`/answers`, data);
    });

    const editAnswer = useMutateAnswers((data) => {
        return axiosInstance.put(`/answers/${data.id}`, data);
    });

    const handleAnswerChange = (value, i) => {
        // setAnswerArray(
        //     (answerArray) => [...answerArray],
        //     (answerArray[i].answer = value)
        // );
        answerArray[i].answer = '123';
        console.log(answerArray[i]);
    };

    console.log(answerArray[0]);
    if (questionsIsLoading || answersIsLoading) {
        return <p>Q&A is loading</p>;
    }
    const Questions = () => {
        return questions.data.data.map((question, i) => {
            // If there are no answers, or answers are not connected to question
            // if (!answers.data.data.question || !answers.data.data) {
            //     setAnswerArray(...answerArray, {});
            // }
            // If there is answer

            if (answers.length) {
                const asd = answers.find(
                    (item) => item.attributes.question.data.id === question.id
                );

                // setAnswerArray(
                //     (answerArray) => [...answerArray],
                //     (answerArray[i] = {
                //         id: asd.id,
                //         answer: asd.attributes.answer,
                //     })
                // );
                answerArray[i] = { id: asd.id, answer: asd.attributes.answer };
                console.log(answerArray);
            }
            return (
                <div key={question.id}>
                    <label>
                        {`Question ${i + 1} - `}
                        {question.attributes.text}
                    </label>

                    <TextField
                        type={question.attributes.type}
                        sx={{ margin: '0 0 10px 0' }}
                        value={answerArray[i].answer}
                        onInput={(e) => {
                            handleAnswerChange(e.target.value, i);
                        }}
                    />

                    <Divider />
                </div>
            );
        });
    };

    return (
        <>
            <FormControl
                component="form"
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={(e) => {
                    e.preventDefault();
                    // handleAnswerSubmit();
                    // answerArray.forEach((answer) => {
                    //     editAnswer.mutate({
                    //         data: {
                    //             answer: answer.answer,
                    //         },
                    //         id: answer.id,
                    //     });
                    // });
                    console.log(answerArray);
                }}
            >
                <Questions />
                <Button
                    variant="outlined"
                    type="submit"
                    sx={{ marginTop: '15px' }}
                >
                    Save
                </Button>
            </FormControl>
        </>
    );
};

export default EditAnswers;
