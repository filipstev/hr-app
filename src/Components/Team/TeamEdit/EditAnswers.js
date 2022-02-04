import { useParams } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import { Button, FormControl } from '@mui/material';

import { useGetQuestions } from '../../../queryFunctions/fetchQuestions';
import { useGetAnswersOfProfile } from '../../../queryFunctions/fetchAnswers';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Answers from './Answers';

const EditAnswers = () => {
    const { id } = useParams();

    const [a, setA] = useState(null);

    const { data: answers, isLoading: answersIsLoading } =
        useGetAnswersOfProfile(id, setA);

    const { data: questions, isLoading: questionsIsLoading } =
        useGetQuestions();

    const editAnswer = useMutation((data) => {
        return axiosInstance.put(`/answers/${data.answerID}`, data);
    });

    const newAnswer = useMutation((data) => {
        return axiosInstance.post(`/answers`, data);
    });

    const handleAChange = (value, i) => {
        setA([...a], (a[i].attributes.answer = value));
    };

    const handleSubmit = () => {
        a.forEach((answer, i) => {
            if (answer.id) {
                editAnswer.mutate({
                    answerID: answer.id,
                    data: { answer: answer.attributes.answer },
                });
            }
            if (!answer.id) {
                newAnswer.mutate({
                    data: {
                        answer: answer.attributes.answer,
                        question: questions[i].id,
                        profile: id,
                    },
                });
            }
        });
    };

    useEffect(() => {
        const conectQA = [];

        if (!questionsIsLoading && !answersIsLoading) {
            if (answers.length > 0) {
                questions.forEach((question, i) => {
                    const answer = answers.find(
                        (answer) =>
                            answer.attributes.question.data.id === question.id
                    );
                    conectQA.push(answer);
                });
            }
        }
        setA([...conectQA]);
    }, [answersIsLoading, answers, questions, questionsIsLoading]);

    if (questionsIsLoading || answersIsLoading) {
        return <p>Q&A is loading</p>;
    }

    return (
        <>
            <FormControl
                component="form"
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <Answers
                    questions={questions}
                    answers={a}
                    handleAChange={handleAChange}
                />
                <Button
                    variant="outlined"
                    type="submit"
                    sx={{ marginTop: '15px' }}
                >
                    Save
                </Button>
                {editAnswer.isSuccess && <p>Answers have been changed</p>}
                {/* {newAnswer.isSuccess && <p>Answers have been changed</p>} */}
            </FormControl>
        </>
    );
};

export default EditAnswers;
