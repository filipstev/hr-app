import { useParams } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import { Button, FormControl } from '@mui/material';

import { useGetQuestions } from '../../../queryFunctions/fetchQuestions';
import { useGetAnswersOfProfile } from '../../../queryFunctions/fetchAnswers';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Answers from './Answers';
import { useFetchImage } from '../../../queryFunctions/fetchImage';
import { useSelector } from 'react-redux';
import SaveButton from '../../Buttons/SaveButton';

const EditAnswers = () => {
    const userId = useSelector((state) => state.user.user.user.id);
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [a, setA] = useState(null);
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');

    const companyName = queryClient.getQueryData(['Company', userId]).data
        .data[0].attributes.name;

    // Get answers
    const { data: answers, isLoading: answersIsLoading } =
        useGetAnswersOfProfile(id);

    // Get questions
    const { data: questions, isLoading: questionsIsLoading } =
        useGetQuestions(companyName);

    // Get id of image if it exists, to delete later if new image is uploaded
    const { data: imageId } = useFetchImage(url);

    // Mutations
    const editAnswer = useMutation((data) => {
        return axiosInstance.put(`/answers/${data.answerID}`, data);
    });

    const newAnswer = useMutation((data) => {
        return axiosInstance.post(`/answers`, data);
    });

    const uploadImage = useMutation((data) => {
        return axiosInstance.post(`/upload`, data);
    });

    const deletePreviousImage = useMutation((id) => {
        return axiosInstance.delete(`/upload/files/${id}`);
    });

    // Handlers
    const handleAChange = (value, i) => {
        console.log(image);
        setA([...a], (a[i].attributes.answer = value));
    };

    const handleAimgChange = (e, i) => {
        console.log('123');
        const img = new FormData();
        img.append('files', e.target.files[0]);
        setImage({ image: img, i: i });
    };

    const handleSubmit = async () => {
        if (imageId) {
            deletePreviousImage.mutate(imageId);
        }
        console.log(image);
        uploadImage.mutate(image.image, {
            onSuccess: (data) => {
                setA([...a], (a[image.i].attributes.answer = data.data[0].url));
                setUrl(data.data[0].url);
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
                queryClient.invalidateQueries('image');
            },
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

                    if (question.attributes.type === 'image') {
                        setUrl(answer.attributes.answer);
                    }
                    conectQA.push(answer);
                });
            }
        }
        setA([...conectQA]);
    }, [answersIsLoading, answers, questions, questionsIsLoading, image]);

    if (questionsIsLoading || answersIsLoading) {
        return <p>Q&A is loading</p>;
    }
    return (
        <>
            <FormControl
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <Answers
                    questions={questions}
                    answers={a}
                    handleAChange={handleAChange}
                    handleAimgChange={handleAimgChange}
                />

                <SaveButton />
                {editAnswer.isSuccess && <p>Answers have been changed</p>}
            </FormControl>
        </>
    );
};

export default EditAnswers;
