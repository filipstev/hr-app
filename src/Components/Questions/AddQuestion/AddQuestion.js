import React, { useState } from 'react';
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
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';

const AddQuestion = (props) => {
  const location = useLocation();
  const [text, setText] = useState('');
  const [type, setType] = useState('text');

  const submitQuestion = () => {
    console.log(text);
    console.log(type);
    console.log(location.state.questions.length);

    if (text !== '' && type && location.state.questions) {
      axiosInstance
        .post('/questions', {
          data: {
            text: text,
            type: type,
            order: location.state.questions.length,
          },
        })
        .then((data) => {
          console.log('success');
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
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
};

export default AddQuestion;
