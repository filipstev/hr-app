import React, { Component, useEffect, useState } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import axiosInstance from '../../helpers/axiosInstance';

const Modal = (props) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axiosInstance
            .get('/questions')
            .then((data) => {
                console.log(data.data.data);
                setQuestions(data.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
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
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        {props.modalInfo[1].profilePhoto ? (
                            <img
                                src={
                                    'https://internship-hr-app.herokuapp.com' +
                                    props.modalInfo[1].profilePhoto.data
                                        .attributes.url
                                }
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    marginRight: '15px',
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
                            }}
                        >
                            {props.modalInfo[1].name}
                        </div>
                    </div>
                    <div>
                        {questions.length > 0
                            ? questions.map((question) => {
                                  return (
                                      <div>
                                          <div>{question.attributes.text}</div>
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
