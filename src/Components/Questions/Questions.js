import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';
import Header from '../Header/Header';
import classes from './Questions.module.css';
import SingleQuestion from './SingleQuestion/SingleQuestion';
import { useMutation, useQuery } from 'react-query';
import Spinner from '../Spinner.js/Spinner';
import { ThemeContext } from '../../context/theme-context';

function compare(a, b) {
    if (a.attributes.order < b.attributes.order) {
        return -1;
    }
    if (a.attributes.order > b.attributes.order) {
        return 1;
    }
    return 0;
}

const fetchQuestions = async (setQuestions, userStorage) => {
    //TODO: DINAMICKI ID ZA KOMPANIJE
    const resUser = await axiosInstance.get(
        '/profiles?filters[user][id][$eq]=' +
            userStorage.user.id +
            '&populate=*'
    );

    const resCompany = await axiosInstance.get(
        '/companies?filters[profiles][id][$eq]=' +
            resUser.data.data[0].id +
            '&populate=*'
    );

    const res = await axiosInstance.get(
        `/questions?filters[company][id][$eq]=${resCompany.data.data[0].id}&populate=*`
    );
    console.log(res.data.data);
    const sortedQuestions = res.data.data.sort(compare);
    setQuestions(sortedQuestions);

    return sortedQuestions;
};
const Questions = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [questions, setQuestions] = useState([]);
    const [meta, setMeta] = useState({});
    const [blocked, setBlocked] = useState(false);
    const [shouldSpin, setShouldSpin] = useState(false);
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const { theme } = useContext(ThemeContext);

    const changeUp = async ({ newOrder, prev, element }) => {
        console.log(newOrder, prev, element);
        await axiosInstance.put('/questions/' + newOrder[prev].id, {
            data: { order: -1 },
        });
        await axiosInstance.put('/questions/' + newOrder[element].id, {
            data: { order: newOrder[element].attributes.order },
        });
        await axiosInstance.put('/questions/' + newOrder[prev].id, {
            data: { order: newOrder[prev].attributes.order },
        });

        setBlocked(false);
    };

    const changeDown = async ({ newOrder, next, element }) => {
        await axiosInstance.put('/questions/' + newOrder[next].id, {
            data: { order: -1 },
        });
        await axiosInstance.put('/questions/' + newOrder[element].id, {
            data: { order: newOrder[element].attributes.order },
        });
        await axiosInstance.put('/questions/' + newOrder[next].id, {
            data: { order: newOrder[next].attributes.order },
        });

        setBlocked(false);
    };

    const deleteQuestionAsync = async (id) => {
        await axiosInstance
            .delete('/questions/' + id)
            .then((data) => {
                console.log('success');
            })
            .catch((err) => {
                console.log(err);
            });
        const index = data.findIndex((q) => q.id === id);

        for (let i = index; i < data.length; i++) {
            if (data[i + 1]) {
                await axiosInstance.put('/questions/' + data[i + 1].id, {
                    data: { order: data[i + 1].attributes.order - 1 },
                });
            }
        }
    };

    const { data, status, refetch } = useQuery(
        ['questions', setQuestions, userStorage],
        () => fetchQuestions(setQuestions, userStorage)
    );

    const { mutate: moveUp } = useMutation(changeUp);
    const { mutate: moveDown } = useMutation(changeDown);
    const { mutateAsync: deleteQ } = useMutation(deleteQuestionAsync);

    const moveQuestion = async (direction, id) => {
        setBlocked(true);
        if (direction === 'up') {
            let element;
            let prev;
            const newOrder = [...data];

            questions.map((question, index, elements) => {
                if (question.id === id) {
                    element = index;
                    prev = index - 1;
                }
            });

            if (element >= 0 && prev >= 0) {
                newOrder[element].attributes.order =
                    newOrder[element].attributes.order - 1;
                newOrder[prev].attributes.order =
                    newOrder[prev].attributes.order + 1;

                setQuestions(newOrder.sort(compare));
                const data = { newOrder, prev, element };
                moveUp(data);
                // await axiosInstance.put('/questions/' + newOrder[prev].id, {
                //     data: { order: -1 },
                // });
                // await axiosInstance.put('/questions/' + newOrder[element].id, {
                //     data: { order: newOrder[element].attributes.order },
                // });
                // await axiosInstance.put('/questions/' + newOrder[prev].id, {
                //     data: { order: newOrder[prev].attributes.order },
                // });
            }
        }

        if (direction === 'down') {
            let element;
            let next;
            const newOrder = [...data];
            newOrder.map((question, index, elements) => {
                if (question.id === id && elements[index + 1]) {
                    element = index;
                    next = index + 1;
                }
            });

            if (element >= 0 && next) {
                newOrder[element].attributes.order =
                    newOrder[element].attributes.order + 1;
                newOrder[next].attributes.order =
                    newOrder[next].attributes.order - 1;
                const sortedOrder = newOrder.sort(compare);
                const data = { newOrder, next, element };
                setQuestions(sortedOrder);

                moveDown(data);
                // setQuestions(newOrder.sort(compare));
                // await axiosInstance.put('/questions/' + newOrder[next].id, {
                //     data: { order: -1 },
                // });
                // await axiosInstance.put('/questions/' + newOrder[element].id, {
                //     data: { order: newOrder[element].attributes.order },
                // });
                // await axiosInstance.put('/questions/' + newOrder[next].id, {
                //     data: { order: newOrder[next].attributes.order },
                // });
            }
        }
    };

    const deleteQuestion = async (id) => {
        // await axiosInstance
        //     .delete('/questions/' + id)
        //     .then((data) => {
        //         console.log('success');
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        deleteQ(id).then(() => {
            refetch();
        });
        // const index = questions.findIndex((q) => q.id === id);

        // for (let i = index; i < questions.length; i++) {
        //     if (questions[i + 1]) {
        //         questions[i + 1].attributes.order =
        //             questions[i + 1].attributes.order - 1;
        //         await axiosInstance.put('/questions/' + questions[i + 1].id, {
        //             data: { order: questions[i + 1].attributes.order },
        //         });
        //     }
        // }
        // if (questions[index + 1]) {
        //     questions[index + 1].attributes.order =
        //         questions[index + 1].attributes.order - 1;
        //     axiosInstance.put('/questions/' + questions[index + 1].id, {
        //         data: { order: questions[index + 1].attributes.order },
        //     });
        // }
        const newQuestions = [...questions];
        newQuestions.splice(
            questions.findIndex((q) => q.id === id),
            1
        );
        setQuestions(newQuestions);
    };

    useEffect(() => {
        refetch();
    }, []);

    if (status === 'loading') {
        return <Spinner />;
    }

    return (
        <>
            <div
                style={{
                    width: '70%',
                    margin: '80px auto',
                    fontFamily: 'Comic Neue',
                }}
                className={classes.AllQuestions}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                    className={classes.NaslovWrap}
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
                        style={{
                            fontWeight: '700',
                            border:
                                theme === 'light'
                                    ? '2px solid #000000'
                                    : '2px solid #fff',
                        }}
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
                {data ? (
                    data.sort(compare).map((question) => {
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
                ) : (
                    <Spinner />
                )}
            </div>
        </>
    );
};

export default Questions;
