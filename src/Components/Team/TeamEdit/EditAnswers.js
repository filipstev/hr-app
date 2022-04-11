import axiosInstance from '../../../helpers/axiosInstance';
import { FormControl } from '@mui/material';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Answers from './Answers';
import { useFetchImage } from '../../../queryFunctions/fetchImage';
import SaveButton from '../../Buttons/SaveButton';

const EditAnswers = ({ id, answers, questions }) => {
    const queryClient = useQueryClient();
    const [a, setA] = useState([]);
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
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
        setA([...a], (a[i].attributes.answer = value));
    };

    const handleAimgChange = (e, i) => {
        setImage({ image: e.target.files, i: i });
    };

    const handleSubmit = async () => {
        if (imageId) {
            deletePreviousImage.mutate(imageId, {
                onSuccess: () => {
                    console.log('Success');
                },
            });
        }

        const img = new FormData();
        img.append('files', image.image[0]);
        if (image === '') {
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
            return;
        }
        uploadImage.mutate(img, {
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
        if (answers.length > 0) {
            questions.forEach((question, i) => {
                const answer = answers?.find(
                    (answer) =>
                        answer?.attributes?.question?.data?.id === question?.id
                );
                if (question.attributes.type === 'image') {
                    setUrl(answer?.attributes.answer);
                }
                conectQA.push(answer);
            });
            setA([...conectQA]);
        }
    }, [answers, questions, image]);

    return (
        <>
            {}
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
                    image={image}
                />

                <SaveButton />
                {editAnswer.isSuccess && <p>Answers have been changed</p>}
            </FormControl>
        </>
    );
};

export default EditAnswers;
