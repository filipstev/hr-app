import { TextField } from '@mui/material';
import useAnswerInput from '../../../hooks/use-answer-input';

export const Input = ({ type, text, i, initialValue, returnvalue }) => {
    const { value, valueChangeHandler, reset } = useAnswerInput(initialValue);

    return (
        <>
            <label htmlFor={`answer${i}`}>
                {`Question ${i + 1} - `}
                {text}
            </label>

            <TextField
                type={type}
                sx={{ margin: '0 0 10px 0' }}
                label={`answer${i}`}
                name={`answer${i}`}
                value={value}
                onChange={(e) => {
                    valueChangeHandler(e);
                    returnvalue(e.target.value, i);
                }}
            />
        </>
    );
};
