import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TeamHeader from './TeamHeader';
import ShowQuestions from './ShowQuestions';
import BasicInfo from './BasicInfo';

const EditProfile = () => {
    const [userName, setUserName] = useState();
    const [userStatus, setUserStatus] = useState('');
    const [answers, setAnswers] = useState('');
    const [userImage, setUserImage] = useState();
    const [questions, setQuestions] = useState();

    const params = useParams();
    const { id } = params;

    const getUserProfile = () => {
        return axiosInstance.get(`/profiles/${id}?populate=*`);
    };

    const getUserQuestions = () => {
        return axiosInstance.get('/questions');
    };

    // const getUserAnswers = () => {
    //     return
    // };

    useEffect(() => {
        Promise.all([getUserProfile(), getUserQuestions()])
            .then((results) => {
                const userProfile = results[0].data.data.attributes;
                const userQuestions = results[1].data.data;
                const userAnswers =
                    results[0].data.data.attributes.answers.data;

                setUserName(userProfile.name);
                setUserStatus(userProfile.status);
                setQuestions([...userQuestions]);
                setAnswers([...userAnswers]);
            })
            .catch((err) => {
                console.log(new Error(err));
            });

        return () => {
            console.log('cleanup');
        };
    }, []);

    const showEdit = () => {
        // console.log('Username: ', userName);
        // console.log('Status: ', userStatus);
        // console.log('Answers : ', answers);
        // console.log('Questions : ', questions);
        // Answers EndPoint
        // console.log('Looking for answers: ', profile.answers.data);

        return (
            <Container
                style={{ marginTop: '150px', padding: '0 200px 0 40px' }}
            >
                <TeamHeader
                    userStatus={userStatus}
                    id={id}
                    setUserStatus={setUserStatus}
                    param={params}
                />
                <Grid
                    container
                    direction="row"
                    justifyContent={'space-between'}
                >
                    <BasicInfo
                        userName={userName}
                        setUserName={setUserName}
                        id={id}
                    />
                    <ShowQuestions questions={questions} answers={answers} />
                </Grid>
            </Container>
        );
    };

    return (
        <>
            {answers ? (
                showEdit()
            ) : (
                <p style={{ marginTop: '150px' }}>Loading...</p>
            )}
        </>
    );
};

export default EditProfile;
