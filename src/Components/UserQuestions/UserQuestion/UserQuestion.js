import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import classes from './UserQuestion.module.css';

const UserQuestion = (props) => {
    const [currentAnswer, setCurrentAnswer] = useState('');

    const changeAnswer = (e) => {
        console.log(e.target.value);
        setCurrentAnswer(e.target.value);
    };

    useEffect(() => {
        setCurrentAnswer(props.answer);
        console.log(props.answerId);
    }, [props.answer]);

    const saveAnswer = () => {
        console.log(currentAnswer, props.question.id, props.userId);
        props.answerId
            ? axiosInstance
                  .put(`/answers/` + props.answerId, {
                      data: {
                          answer: currentAnswer,
                          question: props.question.id,
                          profile: props.profileId,
                      },
                  })
                  .then((data) => {
                      console.log(data);
                  })
                  .catch((err) => {
                      console.log(err);
                  })
            : axiosInstance
                  .post(`/answers/`, {
                      data: {
                          answer: currentAnswer,
                          question: props.question.id,
                          profile: props.profileId,
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
                        onChange={(e) => setCurrentAnswer(e.target.value)}
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
