import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import classes from './UserQuestion.module.css';

const UserQuestion = (props) => {
    const [currentAnswer, setCurrentAnswer] = useState('');
    useEffect(() => {
        setCurrentAnswer(props.answer);
        console.log(props.answer);
    }, [props.answer]);

    const changeAnswer = (e) => {
        console.log(e.target.value);
        setCurrentAnswer(e.target.value);
    };

    const saveAnswer = () => {
        console.log(currentAnswer, props.question.id, props.userId);
        axiosInstance
            .post(`/answers`, {
                data: {
                    answer: currentAnswer,
                    question: props.question.id,
                    profile: props.userId,
                },
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={classes.Wrapper}>
            <div className={classes.Left}>
                <div className={classes.UpDown}>
                    <i
                        onClick={props.nextQuestion}
                        className="fas fa-angle-up"
                    ></i>
                    <div>
                        {props.question
                            ? props.question.attributes.order
                            : null}
                        /{props.max}
                    </div>
                    <i
                        onClick={props.prevQuestion}
                        className="fas fa-angle-down"
                    ></i>
                </div>
                <div className={classes.Question}>
                    <div className={classes.Text}>
                        {props.question ? props.question.attributes.text : null}
                    </div>
                    <input
                        className={classes.Input}
                        value={currentAnswer}
                        onChange={(e) => changeAnswer(e)}
                    ></input>
                </div>
            </div>
            <div className={classes.Right} onClick={saveAnswer}>
                Next
            </div>
        </div>
    );
};

export default UserQuestion;
