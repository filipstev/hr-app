import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import classes from './SingleQuestion.module.css';

<<<<<<< HEAD
const SingleQuestion = (props) => {
  const navigate = useNavigate();
  const onEdit = () => {
    navigate('/edit-question', { state: { id: props.id } });
  };

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
      }}
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
=======
const SingleQuestion = () => {
    return (
        <div
>>>>>>> teams-page
            style={{
                width: '100%',
                border: '2px solid #797979',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px',
                alignItems: 'center',
                marginBottom: '18px',
                boxSizing: 'border-box',
            }}
<<<<<<< HEAD
          >
            {props.title}
          </div>
        </div>
      </div>
      <div className={classes.Right}>
        <div className={classes.ButtonEdit} onClick={onEdit}>
          Edit
        </div>
        <div
          className={classes.ButtonDelete}
          onClick={() => props.deleteQuestion(props.id)}
        >
          Delete
        </div>
      </div>
    </div>
  );
=======
        >
            <div className={classes.Left}>
                <div className={classes.Arrows}>
                    {/* TODO:CUSTOM ICONS */}
                    <i class="fas fa-angle-up"></i>
                    <i class="fas fa-angle-down"></i>
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
                        Question 1 - Text
                    </div>
                    <div
                        style={{
                            fontSize: '20px',
                            lineHeight: '23px',
                            marginTop: '4px',
                        }}
                    >
                        Do you have any pets?
                    </div>
                </div>
            </div>
            <div className={classes.Right}>
                <div className={classes.ButtonEdit}>Edit</div>
                <div className={classes.ButtonDelete}>Delete</div>
            </div>
        </div>
    );
>>>>>>> teams-page
};

export default SingleQuestion;
