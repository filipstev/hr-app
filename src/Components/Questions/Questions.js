import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';
import Header from '../Header/Header';
import classes from './Questions.module.css';
import SingleQuestion from './SingleQuestion/SingleQuestion';

const Questions = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [questions, setQuestions] = useState([]);
  const [meta, setMeta] = useState({});
  const [blocked, setBlocked] = useState(false);

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
        setQuestions(qs);
        setMeta(meta);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const moveQuestion = async (direction, id) => {
    setBlocked(true);
    if (direction === 'up') {
      let element;
      let prev;
      const newOrder = [...questions];

      questions.map((question, index, elements) => {
        if (question.id === id) {
          element = index;
          prev = index - 1;
        }
      });

      if (element >= 0 && prev >= 0) {
        newOrder[element].attributes.order =
          newOrder[element].attributes.order - 1;
        newOrder[prev].attributes.order = newOrder[prev].attributes.order + 1;
        console.log(
          newOrder[element].attributes.order,
          ' ',
          newOrder[prev].attributes.order
        );
        setQuestions(newOrder.sort(compare));
        await axiosInstance.put('/questions/' + newOrder[prev].id, {
          data: { order: -1 },
        });
        await axiosInstance.put('/questions/' + newOrder[element].id, {
          data: { order: newOrder[element].attributes.order },
        });
        await axiosInstance.put('/questions/' + newOrder[prev].id, {
          data: { order: newOrder[prev].attributes.order },
        });
      }
    }

    if (direction === 'down') {
      let element;
      let next;
      const newOrder = [...questions];
      newOrder.map((question, index, elements) => {
        if (question.id === id && elements[index + 1]) {
          element = index;
          next = index + 1;
        }
      });

      if (element >= 0 && next) {
        newOrder[element].attributes.order =
          newOrder[element].attributes.order + 1;
        newOrder[next].attributes.order = newOrder[next].attributes.order - 1;
        setQuestions(newOrder.sort(compare));
        await axiosInstance.put('/questions/' + newOrder[next].id, {
          data: { order: -1 },
        });
        await axiosInstance.put('/questions/' + newOrder[element].id, {
          data: { order: newOrder[element].attributes.order },
        });
        await axiosInstance.put('/questions/' + newOrder[next].id, {
          data: { order: newOrder[next].attributes.order },
        });
      }
    }
    setBlocked(false);
  };

  const deleteQuestion = async (id) => {
    await axiosInstance
      .delete('/questions/' + id)
      .then((data) => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err);
      });
    const index = questions.findIndex((q) => q.id === id);
    if (questions[index + 1]) {
      questions[index + 1].attributes.order =
        questions[index + 1].attributes.order - 1;
      axiosInstance.put('/questions/' + questions[index + 1].id, {
        data: { order: questions[index + 1].attributes.order },
      });
    }
    const newQuestions = [...questions];
    newQuestions.splice(
      questions.findIndex((q) => q.id === id),
      1
    );
    setQuestions(newQuestions);
  };

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
                  moveQuestion={moveQuestion}
                  deleteQuestion={deleteQuestion}
                  blocked={blocked}
                />
              );
            })
          : null}
      </div>
    </>
  );
=======
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
>>>>>>> teams-page
};

export default Questions;
