import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import classes from './UserQuestion.module.css';

const UserQuestion = (props) => {
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [files, setFiles] = useState([]);
    const changeAnswer = (e) => {
        console.log(e.target.value);
        setCurrentAnswer(e.target.value);
    };

    useEffect(() => {
        setCurrentAnswer(props.answer);
        console.log(props.answer);
    }, [props.answer]);

    useEffect(() => {
        console.log(props.isImage);
    }, [props.isImage]);

    const saveAnswer = () => {
        console.log(currentAnswer, props.question.id, props.userId);
        if (props.isImage) {
            uploadImage();
            return;
        }
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

    const uploadImage = async () => {
        const formData = new FormData();

        formData.append('files', files[0]);

        const imageData = await axiosInstance.get(
            `/upload/files?filters[url][$eq]=${props.answer}`
        );

        axiosInstance.delete('/upload/' + imageData.data[0].id);

        axiosInstance
            .post('/upload', formData)
            .then((response) => {
                // console.log(response);
                props.answerId
                    ? axiosInstance
                          .put(`/answers/` + props.answerId, {
                              data: {
                                  answer: response.data[0].url,
                                  question: props.question.id,
                                  profile: props.profileId,
                              },
                          })
                          .then((data) => {
                              console.log(data);
                              setCurrentAnswer(
                                  data.data.data.attributes.answer
                              );
                          })
                          .catch((err) => {
                              console.log(err);
                          })
                    : axiosInstance
                          .post(`/answers/`, {
                              data: {
                                  answer: response.data[0].url,
                                  question: props.question.id,
                                  profile: props.profileId,
                              },
                          })
                          .then((data) => {
                              console.log(data);
                              setCurrentAnswer(
                                  data.data.data.attributes.answer
                              );
                          })
                          .catch((err) => {
                              console.log(err);
                          });
            })
            .catch((error) => {
                console.log(error);
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
                    {!props.isImage ? (
                        <input
                            className={classes.Input}
                            value={currentAnswer}
                            onChange={(e) => setCurrentAnswer(e.target.value)}
                        ></input>
                    ) : (
                        <>
                            <input
                                type="file"
                                onChange={(e) => setFiles(e.target.files)}
                            />
                            <img
                                style={{
                                    width: '100px',
                                    height: '100px',
                                }}
                                src={currentAnswer}
                            />
                        </>
                    )}
                </div>
            </div>
            <div className={classes.Right} onClick={saveAnswer}>
                Save
            </div>
        </div>
    );
};

export default UserQuestion;
