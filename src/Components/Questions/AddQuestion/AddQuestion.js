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

const AddQuestion = (props) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('text');
  const [questionsLength, setQuestionsLength] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/questions')
      .then((data) => {
        setQuestionsLength(data.data.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitQuestion = async () => {
    if (text !== '' && type && questionsLength >= 0) {
      await axiosInstance
        .post('/questions', {
          data: {
            text: text,
            type: type,
            order: questionsLength,
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

<<<<<<< HEAD
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
          Add new Question
        </h2>
        <TextField
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
=======
const AddQuestion = () => {
    return (
        <>
            <Header />
            <div>
                <div>Add new Question</div>
                <div></div>
                <div></div>
                <div>Save</div>
            </div>
        </>
    );
>>>>>>> teams-page
};

export default AddQuestion;
