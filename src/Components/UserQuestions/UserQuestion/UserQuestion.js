import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import classes from './UserQuestion.module.css';
import Default from '../../../assets/defaulty.jpg';
import { Button, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveButton from '../../Buttons/SaveButton';
import Spinner from '../../Spinner.js/Spinner';

const Input = styled('input')({
    display: 'none',
});

const UserQuestion = (props) => {
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [files, setFiles] = useState([]);
    const [shouldSpin, setShouldSpin] = useState(false);
    const changeAnswer = (e) => {
        console.log(e.target.value);
        setCurrentAnswer(e.target.value);
    };

    useEffect(() => {
        setCurrentAnswer(props.answer);
        console.log(props.answer);
    }, [props.answer]);

    useEffect(() => {
        console.log(files.length);
    }, [files]);

    const saveAnswer = () => {
        console.log(currentAnswer, props.question.id, props.profileId);
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
        setShouldSpin(true);
        const formData = new FormData();
        let imageData;

        formData.append('files', files[0]);
        if (props.answer) {
            imageData = await axiosInstance.get(
                `/upload/files?filters[url][$eq]=${props.answer}`
            );
            axiosInstance
                .delete('/upload/files/' + imageData.data[0].id)
                .then(() => {
                    console.log('');
                })
                .catch((e) => {
                    setShouldSpin(false);
                });
        }

        axiosInstance
            .post('/upload', formData)
            .then((response) => {
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
                              setShouldSpin(false);
                          })
                          .catch((err) => {
                              console.log(err);
                              setShouldSpin(false);
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
                              setShouldSpin(false);
                          })
                          .catch((err) => {
                              console.log(err);
                              setShouldSpin(false);
                          });
            })
            .catch((error) => {
                console.log(error);
                setShouldSpin(false);
            });
    };

    if (shouldSpin) {
        return <Spinner />;
    }

    return (
        <div className={classes.Wrapper}>
            <div className={classes.Left}>
                <div className={classes.UpDown}>
                    <i
                        onClick={!props.blocked ? props.nextQuestion : null}
                        className="fas fa-angle-up"
                    ></i>
                    <div>
                        {props.question
                            ? props.question.attributes.order
                            : null}
                        /{props.max}
                    </div>
                    <i
                        onClick={!props.blocked ? props.prevQuestion : null}
                        className="fas fa-angle-down"
                    ></i>
                </div>
                <div className={classes.Question}>
                    <div className={classes.Text}>
                        {props.question ? props.question.attributes.text : null}
                    </div>
                    {!props.isImage && !props.shouldSpin ? (
                        <TextField
                            id="user-question"
                            label="Type your answer"
                            variant="outlined"
                            value={currentAnswer}
                            sx={{ marginTop: '6px' }}
                            onChange={(e) => setCurrentAnswer(e.target.value)}
                        />
                    ) : props.isImage && !props.shouldSpin ? (
                        // <input
                        //     className={classes.Input}
                        //     value={currentAnswer}
                        //     onChange={(e) => setCurrentAnswer(e.target.value)}
                        // ></input>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {currentAnswer && !props.shouldSpin ? (
                                <img
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        margin: '10px 0',
                                    }}
                                    src={
                                        files.length > 0
                                            ? URL.createObjectURL(files[0])
                                            : currentAnswer
                                    }
                                />
                            ) : !currentAnswer && !props.shouldSpin ? (
                                <img
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        margin: '10px 0',
                                    }}
                                    src={
                                        files.length > 0
                                            ? URL.createObjectURL(files[0])
                                            : Default
                                    }
                                />
                            ) : props.shouldSpin ? (
                                <Spinner small />
                            ) : null}
                            <label htmlFor="contained-button-file">
                                <Input
                                    id="contained-button-file"
                                    type="file"
                                    onChange={(e) => setFiles(e.target.files)}
                                />
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
                        </div>
                    ) : (
                        <Spinner small />
                    )}
                </div>
            </div>
            <div className={classes.Right} onClick={saveAnswer}>
                <SaveButton />
            </div>
            {/* <div >
                Save
            </div> */}
        </div>
    );
};

export default UserQuestion;
