import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import { useGetAnswersOfProfile } from '../../../queryFunctions/fetchAnswers';
import { useGetQuestions } from '../../../queryFunctions/fetchQuestions';

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

    const asd = [];
    if (questionsIsLoading || answersIsLoading) {
        return <p>IsLoading...</p>;
    }
    return (
        <>
            {questions.map((question, i) => {
                const answer = answers.find(
                    (answer) =>
                        answer.attributes.question.data.id === question.id
                );
                asd.push(answer);
                console.log('asd', asd);
                return (
                    <div key={i}>
                        <label>
                            {' '}
                            Input
                            <input
                                type="text"
                                onInput={(e) =>
                                    (asd[i].attributes.answer = e.target.value)
                                }
                            ></input>
                        </label>
                    </div>
                );
            })}
        </>
    );
};

export default EditAnswers;
