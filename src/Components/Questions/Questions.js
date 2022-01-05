import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';
import Header from '../Header/Header';
import classes from './Questions.module.css';
import SingleQuestion from './SingleQuestion/SingleQuestion';

const Questions = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [questions, setQuestions] = useState([]);
    const [meta, setMeta] = useState({});

    useEffect(() => {
        axiosInstance
            .get('/questions')
            .then((data) => {
                setQuestions(data);
                setMeta(meta);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user]);

    return (
        <>
            <div style={{ width: '70%', margin: 'auto' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <h1
                        style={{
                            fontSize: '28px',
                            lineHeight: '32px',
                            letterSpacing: '0.04em',
                        }}
                    >
                        Questions
                    </h1>
                    <div
                        className={classes.Button}
                        onClick={() => navigate('/new-question')}
                    >
                        <div>
                            <i
                                class="fas fa-plus"
                                style={{
                                    marginRight: '8px',
                                }}
                            ></i>
                        </div>

                        <span>Add new question</span>
                    </div>
                </div>
                {/* <SingleQuestion /> */}
                {questions.length > 0
                    ? questions.map((question) => {
                          return <SingleQuestion />;
                      })
                    : null}
            </div>
        </>
    );
};

export default Questions;
