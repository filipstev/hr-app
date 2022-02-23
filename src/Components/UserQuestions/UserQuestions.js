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
    setAnswers,
    setCurrentAnswer,
    setAnswerId,
    setIsImage,
    setTotal
) => {
    //TODO: DINAMICKI ID ZA KOMPANIJE
    const res = await axiosInstance.get(
        `/questions?filters[company][id][$eq]=2&populate=*`
    );

    const sortedQuestions = res.data.data.sort(compare);
    setQuestions(sortedQuestions);
    setTotal(sortedQuestions.length);

    if (currentQuestion === null) {
        setCurrentQuestion(sortedQuestions[0]);
        if (sortedQuestions[0].attributes.type === 'image') {
            setIsImage(true);
        } else {
            setIsImage(false);
        }
        const foundAnswer = await axiosInstance.get(
            `/answers?filters[question][id][$eq]=${
                sortedQuestions[0].id
            }&filters[profile][id][$eq]=${41}&populate=*`
        );
        if (foundAnswer.data.data) {
            if (foundAnswer.data.data[0]) {
                setCurrentAnswer(foundAnswer.data.data[0].attributes.answer);
                setAnswerId(foundAnswer.data.data[0].id);
            } else {
                setCurrentAnswer('');
            }
        }
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
    const [answerId, setAnswerId] = useState();
    const [isImage, setIsImage] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [total, setTotal] = useState(0);

    const user = JSON.parse(localStorage.getItem('user'));
    const getUserProfile = async () => {
        // console.log(userId);
        const profileId = await axiosInstance.get(
            `/profiles?filters[user][id][$eq]=${user.user.id}&populate=*`
        );
        return profileId;
    };

    useEffect(async () => {
        const profile = await axiosInstance.get(
            `/profiles?filters[user][id][$eq]=${user.user.id}&populate=*`
        );
        console.log(profile.data.data[0].id);
        setProfileId(profile.data.data[0].id);
    }, []);

    const { data, status, refetch } = useQuery(
        [
            'questions',
            setQuestions,
            currentQuestion,
            setCurrentQuestion,
            setAnswers,
            setCurrentAnswer,
            setAnswerId,
            setIsImage,
            setTotal,
        ],
        () =>
            fetchQuestions(
                setQuestions,
                currentQuestion,
                setCurrentQuestion,
                setAnswers,
                setCurrentAnswer,
                setAnswerId,
                setIsImage,
                setTotal
            ),
        { keepPreviousData: true }
    );

    const nextQuestion = () => {
        let newQ = data.find(
            (question, index) =>
                question.attributes.order ===
                currentQuestion.attributes.order + 1
        );

        if (newQ) {
            setBlocked(true);
            setAnswerId();
            setCurrentAnswer('');
            if (newQ.attributes.type === 'image') {
                setIsImage(true);
            } else {
                setIsImage(false);
            }
            setCurrentQuestion(newQ);
            getAnswer(newQ);
        }

        setBlocked(false);
    };

    const prevQuestion = () => {
        //blocked mechanism
        let newQ = data.find(
            (question, index) =>
                question.attributes.order ===
                currentQuestion.attributes.order - 1
        );
        if (newQ) {
            setBlocked(true);
            setAnswerId();
            setCurrentAnswer('');

            if (newQ.attributes.type === 'image') {
                setIsImage(true);
            } else {
                setIsImage(false);
            }
            setCurrentQuestion(newQ);
            getAnswer(newQ);
        }

        setBlocked(false);
    };

    const getAnswer = async (questionFor) => {
        const foundAnswer = await axiosInstance.get(
            `/answers?filters[question][id][$eq]=${
                questionFor.id
            }&filters[profile][id][$eq]=${41}&populate=*`
        );
        console.log(foundAnswer);
        if (foundAnswer.data.data) {
            if (foundAnswer.data.data[0]) {
                setCurrentAnswer(foundAnswer.data.data[0].attributes.answer);
                if (
                    foundAnswer.data.data[0].attributes.question.data.attributes
                        .type === 'image'
                ) {
                    setIsImage(true);
                }
                setAnswerId(foundAnswer.data.data[0].id);
            } else {
                setCurrentAnswer('');
            }
        }
        // if (questionFor) {
        //     questionFor.attributes.answers.data.map((answerQ) => {
        //         let foundAnswer;
        //         foundAnswer = answers.find((answer) => {
        //             return answer.id === answerQ.id;
        //         });
        //         if (foundAnswer) {
        //             console.log(foundAnswer, 'AJDE BRE');
        //             setCurrentAnswer(foundAnswer);
        //             retAnswer = foundAnswer.attributes.answer;
        //             return foundAnswer.attributes.answer;
        //         }
        //     });
        // }
        // if (!retAnswer) {
        //     setCurrentAnswer(null);
        // }

        // console.log(retAnswer, 'OVDE');
        // return retAnswer;
    };

    // useEffect(() => {
    //     if (data) {
    //         setCurrentQuestion(data[0]);
    //     }
    // }, []);

    useEffect(() => {
        if (data) {
            setCurrentQuestion(data[0]);

            getAnswer(data[0]);
        }
    }, []);

    if (status === 'loading') {
        return <div style={{ marginTop: '80px' }}>Loading...</div>;
    }

    return (
        <div style={{ marginTop: '80px' }}>
            <div>
                <UserQuestion
                    question={currentQuestion}
                    max={data ? data.length : total}
                    profileId={profileId}
                    answerId={currentAnswer ? answerId : null}
                    answer={currentAnswer ? currentAnswer : ''}
                    nextQuestion={nextQuestion}
                    prevQuestion={prevQuestion}
                    blocked={blocked}
                    isImage={isImage}
                    // userId={profileId}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    // changeAnswer={changeAnswer}
                />

                {/* {data
                    ? data.map((question, i) => {
                          let foundAnswer;
                          if (question) {
                              question.attributes.answers.data.map(
                                  (answerQ) => {
                                      foundAnswer = answers.find((answer) => {
                                          return answer.id === answerQ.id;
                                      });
                                  }
                              );
                              return (
                                  <UserQuestion
                                      question={currentQuestion}
                                      max={data.length}
                                      answer={foundAnswer}
                                      nextQuestion={nextQuestion}
                                      prevQuestion={prevQuestion}
                                      userId={profileId}
                                  />
                              );
                          }
                      })
                    : null} */}
            </div>
        </div>
    );
};

export default UserQuestions;
