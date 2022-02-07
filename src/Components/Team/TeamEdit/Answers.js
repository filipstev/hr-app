import { Divider, TextField } from '@mui/material';

const Answers = ({ questions, answers, handleAChange }) => {
    return (
        answers &&
        questions.map((question, i) => {
            if (!answers[i]) {
                answers[i] = {
                    attributes: {
                        answer: '',
                    },
                };
            }

            return (
                <>
                    <label>
                        {`Question ${i + 1} - `}
                        {question.attributes.text}
                    </label>

                    <TextField
                        type={
                            question.attributes.type === 'image'
                                ? 'file'
                                : ' text'
                        }
                        sx={{ margin: '0 0 10px 0' }}
                        label={question.attributes.text}
                        name={`answer${i}`}
                        value={answers[i].attributes.answer}
                        onInput={(e) => handleAChange(e.target.value, i)}
                    />

                    <Divider />
                </>
            );
        })
    );
};
export default Answers;
