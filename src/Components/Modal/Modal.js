import React, { Component, useEffect, useState } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import axiosInstance from '../../helpers/axiosInstance';
import Avatar from '../../assets/avatar.png';
import { useQuery } from 'react-query';
import Spinner from '../Spinner.js/Spinner';

const fetchAnwers = async (id) => {
    const answersRes = await axiosInstance.get(`/profiles/${id}?populate=*`);
    return answersRes.data.data.attributes.answers.data;
};

const fetchQuestions = async () => {
    const userStorage = JSON.parse(localStorage.getItem('user'));

    const resUser = await axiosInstance.get(
        '/profiles?filters[user][id][$eq]=' +
            userStorage.user.id +
            '&populate=*'
    );

    const resCompany = await axiosInstance.get(
        '/companies?filters[profiles][id][$eq]=' +
            resUser.data.data[0].id +
            '&populate=*'
    );

    const res = await axiosInstance.get(
        `/questions?filters[company][id][$eq]=${resCompany.data.data[0].id}&populate=*`
    );

    return res.data.data;
};

const Modal = (props) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const {
        data: answersQuery,
        refetch,
        status,
    } = useQuery(
        ['modal-answers', props.modalInfo[0]],
        () => fetchAnwers(props.modalInfo[0]),
        {
            enabled: false,
        }
    );

    const { data: questionsQuery, status: qStatus } = useQuery(
        'modal-questions',
        fetchQuestions
    );

    useEffect(() => {
        // if (props.show === true) {
        //     if (props.modalInfo[0]) {
        //         axiosInstance
        //             .get(`/profiles/${props.modalInfo[0]}?populate=*`)
        //             .then((data) => {
        //                 setAnswers([...data.data.data.attributes.answers.data]);
        //                 // console.log(data.data.data.attributes.answers.data);
        //             })
        //             .catch((err) => {
        //                 console.log(err);
        //             });
        //     }

        //     axiosInstance
        //         .get('/questions?populate=*')
        //         .then((data) => {
        //             setQuestions(data.data.data);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // }
        if (props.show) {
            refetch();
        }
    }, [props.show]);

    // useEffect(() => {
    //     let answersinrow = [];

    //     questions.forEach((question) => {
    //         answers.forEach((answer) => {
    //             question.attributes.answers.data.forEach((answerinq) => {
    //                 if (answer.id === answerinq.id) {
    //                     answersinrow.push(answerinq);
    //                 }
    //             });
    //         });
    //     });

    //     setAnswers([...answersinrow]);
    // }, []);

    // const getA = () => {
    //     return axiosInstance.get(`/profiles/${params.id}?populate=*`);
    // };

    if (status === 'loading' || qStatus === 'loading') {
        return <Spinner small={true} />;
    }
    return (
        <>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            {props.modalInfo.length > 0 ? (
                <div
                    className={classes.Modal}
                    style={{
                        transform: props.show
                            ? 'translateY(0)'
                            : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0',
                        fontFamily: 'Comic Neue',
                        maxWidth: '91vw',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                        }}
                        className={classes.ImgName}
                    >
                        {props.modalInfo[1].profilePhoto.data ? (
                            <img
                                src={
                                    props.modalInfo[1].profilePhoto.data
                                        .attributes.formats.thumbnail.url
                                }
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    marginRight: '30px',
                                    objectFit: 'cover',
                                }}
                                className={classes.Image}
                            />
                        ) : (
                            <img
                                src={Avatar}
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    marginRight: '30px',
                                    objectFit: 'cover',
                                }}
                                className={classes.Image}
                            />
                        )}
                        <div
                            style={{
                                fontSize: '28px',
                                fontWeight: 'bold',
                                height: 'fit-content',
                                lineHeight: '32px',
                                letterSpacing: '0.04em',
                            }}
                            className={classes.Name}
                        >
                            {props.modalInfo[1].name
                                ? props.modalInfo[1].name
                                : null}
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: '30px',
                            maxHeight: '40vh',
                            overflow: 'scroll',
                            maxWidth: '80vw',
                            overflowX: 'hidden',
                        }}
                    >
                        {questionsQuery?.map((question, i) => {
                            //   console.log(
                            //       question.attributes.answers.data[0]
                            //   );

                            //   console.log(
                            //       answers[i].id ===
                            //           question.attributes.answers.data[i].id
                            //   );
                            return (
                                <div key={Math.random()}>
                                    <div
                                        style={{
                                            marginTop: '12px',
                                            fontSize: '24px',
                                            lineHeight: '28px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {question.attributes.text}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <i
                                            className="fas fa-chevron-right"
                                            style={{
                                                marginRight: '8px',
                                                fontSize: '12px',
                                            }}
                                        ></i>
                                        {question.attributes.answers.data.map(
                                            (answerQ) => {
                                                let foundAnswer;
                                                foundAnswer =
                                                    answersQuery?.find(
                                                        (answer) => {
                                                            return (
                                                                answer.id ===
                                                                answerQ.id
                                                            );
                                                        }
                                                    );
                                                if (foundAnswer) {
                                                    if (
                                                        foundAnswer.attributes.answer.includes(
                                                            '/image/upload'
                                                        )
                                                    ) {
                                                        return (
                                                            <img
                                                                src={
                                                                    foundAnswer
                                                                        .attributes
                                                                        .answer
                                                                }
                                                                style={{
                                                                    width: '100px',
                                                                    height: '100px',
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                            />
                                                        );
                                                    }
                                                    return foundAnswer
                                                        .attributes.answer;
                                                }
                                            }
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Modal;
