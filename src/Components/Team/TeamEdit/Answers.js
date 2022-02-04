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
                <div key={i}>
                    <label>
                        {`Question ${i + 1} - `}
                        {question.attributes.text}
                    </label>

                    <TextField
                        type={question.attributes.type}
                        sx={{ margin: '0 0 10px 0' }}
                        label={question.attributes.text}
                        name={`answer${i}`}
                        value={answers[i].attributes.answer}
                        onChange={(e) => handleAChange(e.target.value, i)}
                    />

                    <Divider />
                </div>
            );
        })
    );
};
export default Answers;
