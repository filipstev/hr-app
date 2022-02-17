import React, { Component, useEffect, useState } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import axiosInstance from '../../helpers/axiosInstance';

const Modal = (props) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if (props.show === true) {
            if (props.modalInfo[0]) {
                axiosInstance
                    .get(`/profiles/${props.modalInfo[0]}?populate=*`)
                    .then((data) => {
                        setAnswers([...data.data.data.attributes.answers.data]);
                        // console.log(data.data.data.attributes.answers.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

            axiosInstance
                .get('/questions?populate=*')
                .then((data) => {
                    setQuestions(data.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
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

    const getAnswer = (i) => {
        let answerRet;
        questions.map((question) => {
            question.attributes.answers.data.find((answer) => {
                console.log(answer.id, answers[i].id);
                if (answer.id === answers[i].id) {
                    answerRet = answer;
                    return answer;
                }
            });
        });

        console.log(answerRet);
        return answerRet;
    };
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
                                }}
                            />
                        ) : (
                            <div>X</div>
                        )}
                        <div
                            style={{
                                fontSize: '28px',
                                fontWeight: 'bold',
                                height: 'fit-content',
                                lineHeight: '32px',
                                letterSpacing: '0.04em',
                            }}
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
                        {questions.length > 0
                            ? questions.map((question, i) => {
                                  //   console.log(
                                  //       question.attributes.answers.data[0]
                                  //   );

                                  //   console.log(
                                  //       answers[i].id ===
                                  //           question.attributes.answers.data[i].id
                                  //   );
                                  return (
                                      <div>
                                          <div
                                              style={{
                                                  marginTop: '12px',
                                                  fontSize: '24px',
                                                  lineHeight: '28px',
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
                                                  class="fas fa-chevron-right"
                                                  style={{
                                                      marginRight: '8px',
                                                      fontSize: '12px',
                                                  }}
                                              ></i>
                                              {question.attributes.answers.data.map(
                                                  (answerQ) => {
                                                      let foundAnswer;
                                                      foundAnswer =
                                                          answers.find(
                                                              (answer) => {
                                                                  return (
                                                                      answer.id ===
                                                                      answerQ.id
                                                                  );
                                                              }
                                                          );
                                                      if (foundAnswer) {
                                                          return foundAnswer
                                                              .attributes
                                                              .answer;
                                                      }
                                                  }
                                              )}
                                          </div>
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Modal;
