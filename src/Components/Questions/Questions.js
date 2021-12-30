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

  function compare(a, b) {
    if (a.attributes.order < b.attributes.order) {
      return -1;
    }
    if (a.attributes.order > b.attributes.order) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    axiosInstance
      .get('/questions')
      .then((data) => {
        const qs = data.data.data;
        qs.sort(compare);
        console.log(qs);
        setQuestions(qs);
        setMeta(meta);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  useEffect(() => {
    // console.log(questions);
    // questions.map((question) => {
    //   console.log(question.attributes.order);
    // });
  }, [questions]);

  return (
    <>
      <div style={{ width: '70%', margin: '80px auto' }}>
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
                className="fas fa-plus"
                style={{
                  marginRight: '8px',
                }}
              ></i>
            </div>

            <span>Add new question</span>
          </div>
        </div>
        {questions.length > 0
          ? questions.map((question) => {
              return (
                <SingleQuestion
                  title={question.attributes.text}
                  type={question.attributes.type}
                  order={question.attributes.order}
                  id={question.id}
                  key={question.id}
                  totalLength={questions.length}
                />
              );
            })
          : null}
      </div>
    </>
  );
};

export default Questions;
