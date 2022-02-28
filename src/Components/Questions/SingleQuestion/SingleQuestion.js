import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import classes from './SingleQuestion.module.css';
import { ThemeContext } from '../../../context/theme-context';

const SingleQuestion = (props) => {
    const navigate = useNavigate();
    const onEdit = () => {
        navigate('/edit-question', {
            state: { id: props.id },
        });
    };
    const { theme } = useContext(ThemeContext);

    return (
        <div
            style={{
                width: '100%',
                border: '2px solid #797979',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px',
                alignItems: 'center',
                marginBottom: '18px',
                boxSizing: 'border-box',
                fontFamily: 'Comic Neue',
            }}
            className={classes.QuestionWrap}
        >
            <div className={classes.Left}>
                <div className={classes.Arrows}>
                    {/* TODO:CUSTOM ICONS */}
                    <i
                        className="fas fa-angle-up"
                        onClick={() => {
                            if (!props.blocked) {
                                props.moveQuestion('up', props.id);
                            }
                        }}
                    ></i>
                    <i
                        className="fas fa-angle-down"
                        onClick={() => {
                            console.log(props.blocked);
                            if (!props.blocked) {
                                props.moveQuestion('down', props.id);
                            }
                        }}
                    ></i>
                </div>
                <div className={classes.Text}>
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontSize: '12px',
                            lineHeight: '14px',
                            letterSpacing: '0.04em',
                        }}
                    >
                        Question {props.order + 1} - {props.type}
                    </div>
                    <div
                        style={{
                            fontSize: '20px',
                            lineHeight: '23px',
                            marginTop: '4px',
                            fontWeight: '500',
                        }}
                    >
                        {props.title}
                    </div>
                </div>
            </div>
            <div className={classes.Right}>
                <div
                    className={classes.ButtonEdit}
                    style={{
                        border:
                            theme === 'light'
                                ? '2px solid #000000'
                                : '2px solid #fff',
                    }}
                    onClick={onEdit}
                >
                    Edit
                </div>
                <div
                    className={classes.ButtonDelete}
                    style={{
                        border:
                            theme === 'light'
                                ? '2px solid #000000'
                                : '2px solid #fff',
                    }}
                    onClick={() => props.deleteQuestion(props.id)}
                >
                    Delete
                </div>
            </div>
        </div>
    );
};

export default SingleQuestion;
