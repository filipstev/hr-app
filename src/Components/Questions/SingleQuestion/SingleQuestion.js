import React from 'react';
import axiosInstance from '../../../helpers/axiosInstance';
import classes from './SingleQuestion.module.css';

const SingleQuestion = (props) => {
  const onEdit = () => {};

  const onDelete = () => {
    axiosInstance
      .delete('/questions/' + props.id)
      .then((data) => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err);
      });
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
            Question {props.order} - {props.type}
          </div>
          <div
            style={{
              fontSize: '20px',
              lineHeight: '23px',
              marginTop: '4px',
            }}
          >
            {props.title}
          </div>
        </div>
      </div>
      <div className={classes.Right}>
        <div className={classes.ButtonEdit} onClick={onEdit}>
          Edit
        </div>
        <div className={classes.ButtonDelete} onClick={onDelete}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
