import { useParams } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import { Button, Divider, TextField, FormControl } from '@mui/material';

import { useGetQuestions } from '../../../queryFunctions/fetchQuestions';
import { useMutateAnswers } from '../../../hooks/use-mutate-answers';
import { useGetAnswersOfProfile } from '../../../queryFunctions/fetchAnswers';

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

    const newAnswer = useMutateAnswers((data) => {
        return axiosInstance.post(`/answers`, data);
    });

    const editAnswer = useMutateAnswers((data) => {
        return axiosInstance.put(`/answers/${data.id}`, data);
    });

    if (questionsIsLoading || answersIsLoading) {
        return <p>Q&A is loading</p>;
    }
    const Questions = () =>
        questions.data.data.map((question, i) => {
            let answer;
            // If there are no answers, or answers are not connected to question
            if (!answers.data.data.question || !answers.data.data) {
                answer = '';
            }
            // If there is answer
            // if (answers.data.data.length) {
            //     answer = answers.data.data.find(
            //         (item) => item.attributes.question.data.id === question.id
            //     ).attributes.answer;
            // }

            return (
                <div key={question.id}>
                    <label>
                        {`Question ${i + 1} - `}
                        {question.attributes.text}
                    </label>

                    <TextField
                        type={question.attributes.type}
                        sx={{ margin: '0 0 10px 0' }}
                        value={answer}
                        onInput={(e) => {
                            // answers.data.data.attributes.answers.data[
                            //     i
                            // ].attributes.answer = e.target.value;
                        }}
                    />

                    <Divider />
                </div>
            );
        });

    return (
        <>
            <FormControl
                component="form"
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={(e) => {
                    e.preventDefault();
                    // handleAnswerSubmit();
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
