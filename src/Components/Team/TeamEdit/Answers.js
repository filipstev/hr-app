import { Divider, TextField } from '@mui/material';

const Answers = ({ questions, answers, handleAChange }) => {
    console.log(answers);
    return (
        answers &&
        questions.map((question, i) => {
            // const answer = answers.find(
            //     (answer) => answer.attributes.question.data.id === question.id
            // );
            return (
                <>
                    <label>
                        {`Question ${i + 1} - `}
                        {question.attributes.text}
                    </label>

                    <TextField
                        type={question.attributes.type}
                        sx={{ margin: '0 0 10px 0' }}
                        label={`answer${i}`}
                        name={`answer${i}`}
                        value={answers[i].attributes.answer}
                        onChange={(e) => handleAChange(e.target.value, i)}
                    />

                    <Divider />
                </>
            );
        })
    );
};
export default Answers;
