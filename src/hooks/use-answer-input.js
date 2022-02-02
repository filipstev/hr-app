import { useState } from 'react';

const useAnswerInput = (initalValue) => {
    const [enteredValue, setEnteredValue] = useState(initalValue);

    const valueChangeHandler = (e) => {
        setEnteredValue(e.target.value);
    };

    const reset = () => {
        setEnteredValue('');
    };

    return {
        valueChangeHandler,
        value: enteredValue,
        reset,
    };
};

export default useAnswerInput;
