import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../helpers/axiosInstance';
import SingleQuestion from '../Questions/SingleQuestion/SingleQuestion';
import UserQuestion from './UserQuestion/UserQuestion';

function compare(a, b) {
    if (a.attributes.order < b.attributes.order) {
        return -1;
    }
    if (a.attributes.order > b.attributes.order) {
        return 1;
    }
    return 0;
}

const fetchQuestions = async (
    setQuestions,
    currentQuestion,
    setCurrentQuestion,

    setAnswers
) => {
    //TODO: DINAMICKI ID ZA KOMPANIJE
    const res = await axiosInstance.get(
        `/questions?filters[company][id][$eq]=2&populate=*`
    );
    const ans = await axiosInstance.get(`/profiles/41?populate=*`);
    setAnswers(ans.data.data.attributes.answers.data);

    const sortedQuestions = res.data.data.sort(compare);
    setQuestions(sortedQuestions);

    if (currentQuestion === null) {
        setCurrentQuestion(sortedQuestions[0]);
    }

    return sortedQuestions;
};

// const fetchAnswers = async () => {
//     axiosInstance
//         .get(`/profiles/${props}?populate=*`)
//         .then((data) => {
//             setAnswers([...data.data.data.attributes.answers.data]);
//             // console.log(data.data.data.attributes.answers.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

const UserQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState();
    const [profileId, setProfileId] = useState();
    const user = JSON.parse(localStorage.getItem('user'));
    const getUserProfile = async () => {
        // console.log(userId);
        const profileId = await axiosInstance.get(
            `https://internship-hr-app.herokuapp.com/api/profiles?filters[user][id][$eq]=${user.user.id}&populate=*`
        );
        return profileId;
    };

    useEffect(async () => {
        const profile = await axiosInstance.get(
            `/profiles?filters[user][id][$eq]=${user.user.id}&populate=*`
        );
        setProfileId(profile.data.data[0].id);
        console.log(profile.data.data[0].id);
        // console.log(userId.user.id);
    }, []);

    const { data, status, refetch } = useQuery(
        [
            'questions',
            setQuestions,
            currentQuestion,
            setCurrentQuestion,
            setAnswers,
        ],
        () =>
            fetchQuestions(
                setQuestions,
                currentQuestion,
                setCurrentQuestion,
                setAnswers
            )
    );

    const nextQuestion = () => {
        console.log(currentQuestion.attributes.order);

        let newQ = data.find(
            (question, index) =>
                question.attributes.order ===
                currentQuestion.attributes.order + 1
        );
        if (newQ) {
            setCurrentQuestion(newQ);
        }
        console.log(newQ);
    };

    const prevQuestion = () => {
        console.log(currentQuestion.attributes.order);
        let newQ = data.find(
            (question, index) =>
                question.attributes.order ===
                currentQuestion.attributes.order - 1
        );
        if (newQ) {
            setCurrentQuestion(newQ);
        }
        console.log(newQ);
    };

    const getAnswer = () => {
        let retAnswer;
        if (currentQuestion) {
            currentQuestion.attributes.answers.data.map((answerQ) => {
                let foundAnswer;
                foundAnswer = answers.find((answer) => {
                    return answer.id === answerQ.id;
                });
                if (foundAnswer) {
                    setCurrentAnswer(foundAnswer);
                    console.log(foundAnswer);
                    retAnswer = foundAnswer.attributes.answer;
                    return foundAnswer.attributes.answer;
                }
            });
        }
        return retAnswer;
    };

    useEffect(() => {
        if (data) {
            setCurrentQuestion(data[0]);

            console.log(data[0]);
        }
    }, []);
    return (
        <div style={{ marginTop: '80px' }}>
            <div>
                {data ? (
                    <UserQuestion
                        question={currentQuestion}
                        max={data.length}
                        answer={getAnswer()}
                        nextQuestion={nextQuestion}
                        prevQuestion={prevQuestion}
                        userId={profileId}
                        // changeAnswer={changeAnswer}
                    />
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default UserQuestions;
