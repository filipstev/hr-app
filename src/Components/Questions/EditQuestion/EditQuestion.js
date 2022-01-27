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
import { useLocation, useNavigate } from 'react-router-dom';

import { useMutation, useQuery } from 'react-query';

const EditQuestion = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [text, setText] = useState('');
    const [type, setType] = useState('text');
    const [id, setId] = useState(null);

    const fetchQuestion = async (setText, setType, setId) => {
        const res = await axiosInstance.get(`/questions/${location.state.id}`);

        setText(res.data.data.attributes.text);
        setType(res.data.data.attributes.type);
        setId(res.data.data.id);

        return res.data.data;
    };

    const { data, status, refetch } = useQuery(
        ['questions', setText, setType, setId],
        () => fetchQuestion(setText, setType, setId)
    );

    // useEffect(() => {
    //     axiosInstance
    //         .get('/questions/' + location.state.id)
    //         .then((data) => {
    //             console.log(data.data.data.attributes);
    //             setText(data.data.data.attributes.text);
    //             setType(data.data.data.attributes.type);
    //             setId(data.data.data.id);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [location.state]);

    const submitQuestion = async () => {
        if (text !== '' && type && id) {
            await axiosInstance
                .put('/questions/' + location.state.id, {
                    data: {
                        text: text,
                        type: type,
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
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
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
                    Edit Question
                </h2>
                <TextField
                    defaultValue=" "
                    autoFocus
                    label="Question text"
                    variant="outlined"
                    fullWidth="true"
                    style={{ marginBottom: '40px' }}
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
                        <MenuItem value={'long'}>Long text</MenuItem>
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

export default EditQuestion;
