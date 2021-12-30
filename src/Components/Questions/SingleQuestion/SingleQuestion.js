import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import classes from './SingleQuestion.module.css';

const SingleQuestion = (props) => {
  const navigate = useNavigate();
  const onEdit = () => {
    navigate('/edit-question', { state: { id: props.id } });
  };

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

  const moveUp = () => {
    console.log(props.order);
    if (props.order - 1 !== -1) {
      axiosInstance
        .put('/questions/' + props.id, {
          data: { order: props.order - 1 },
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const moveDown = () => {
    console.log(props.order + 1);
    if (props.order + 1 < props.totalLength) {
      axiosInstance.put('/questions/' + props.id, {
        data: { order: props.order + 2 },
      });
    }
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
          <i className="fas fa-angle-up" onClick={moveUp}></i>
          <i className="fas fa-angle-down" onClick={moveDown}></i>
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
