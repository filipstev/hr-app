import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import {
    TextField,
    Button,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import axiosInstance from '../../../helpers/axiosInstance';
import { useNavigate } from 'react-router-dom';
import classes from './AddQuestion.module.css';

const AddQuestion = (props) => {
    const [text, setText] = useState('');
    const [type, setType] = useState('text');
    const [questionsLength, setQuestionsLength] = useState(null);
    const [company, setCompany] = useState('');
    const [meta, setMeta] = useState();

    const userStorage = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    useEffect(async () => {
        // axiosInstance
        //     .get('/questions')
        //     .then((data) => {
        //         setQuestionsLength(data.data.data.length);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
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

        setCompany(resCompany.data.data[0].id);

        const res = await axiosInstance.get(`/questions`);

        console.log(res.data.data.length);

        setQuestionsLength(res.data.data.length);
        // axiosInstance
        //     .get('/profiles?filters[user][id][$eq]=80&populate=*')
        //     .then((data) => {
        //         setCompany(data.data.data[0].attributes.company.data.id);
        //     });
    }, []);

    const submitQuestion = async () => {
        if (text !== '' && type && questionsLength >= 0) {
            console.log(company, questionsLength);
            await axiosInstance
                .post('/questions', {
                    data: {
                        text: text,
                        type: type,
                        order: questionsLength,
                        company: company,
                    },
                })
                .then((data) => {
                    console.log('success');
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
            navigate('/questions');
        }
    };

    return (
        <>
            <div
                style={{
                    width: '50%',
                    margin: '40px auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
                className={classes.QuestionWrap}
            >
                <h2
                    style={{
                        marginBottom: '40px',
                        marginTop: '30px',
                        fontSize: '28px',
                        lineHeight: '32px',
                        letterSpacing: '0.04em',
                    }}
                >
                    Add new Question
                </h2>
                <TextField
                    label="Question text"
                    variant="outlined"
                    fullWidth="true"
                    style={{
                        marginBottom: '40px',
                    }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <FormControl sx={{ minWidth: 300, marginBottom: '30px' }}>
                    {/* <FormHelperText>Question type</FormHelperText> */}
                    <InputLabel id="qtype-label">Question type</InputLabel>
                    <Select
                        labelId="qtype-label"
                        id="qtype"
                        value={type}
                        label="Question Type"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value={'text'}>Text</MenuItem>
                        <MenuItem value={'long_text'}>Long text</MenuItem>
                        <MenuItem value={'image'}>Image</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    style={{ alignSelf: 'flex-end' }}
                    variant="outlined"
                    onClick={submitQuestion}
                >
                    Save
                </Button>
            </div>
        </>
    );
};

export default AddQuestion;
