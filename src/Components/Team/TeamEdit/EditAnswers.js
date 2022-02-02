import { useParams } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import { Button, Divider, TextField, FormControl } from '@mui/material';

import { useGetQuestions } from '../../../queryFunctions/fetchQuestions';
import { useMutateAnswers } from '../../../hooks/use-mutate-answers';
import { useGetAnswersOfProfile } from '../../../queryFunctions/fetchAnswers';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { AssignmentReturnedSharp } from '@mui/icons-material';
import Answers from './Answers';

const EditAnswers = () => {
    const { id } = useParams();

    const [a, setA] = useState(null);

    const {
        data: answers,
        status: answerStatus,
        isLoading: answersIsLoading,
    } = useGetAnswersOfProfile(id, setA);

    const {
        data: questions,
        status: questionStatus,
        isLoading: questionsIsLoading,
    } = useGetQuestions();

    const handleAChange = (value, i) => {
        setA([...a], (a[i].attributes.answer = value));
        console.log(a[i]);
    };

    useEffect(() => {
        !answersIsLoading && setA([...answers]);
    }, [answersIsLoading, answers]);

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
            </FormControl>
        </>
    );
};

export default EditAnswers;
