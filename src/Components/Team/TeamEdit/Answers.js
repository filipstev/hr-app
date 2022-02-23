import { Divider, TextField } from '@mui/material';
import UploadAnswerImgButton from '../../Buttons/UploadAnswerImgButton';
const Answers = ({ questions, answers, handleAChange, handleAimgChange }) => {
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
                <div key={question.attributes.text}>
                    <label>
                        {`Question ${i + 1} - `}
                        {question.attributes.text}
                    </label>
                    {question.attributes.type === 'image' ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '7px',
                            }}
                        >
                            <UploadAnswerImgButton
                                onInput={handleAimgChange}
                                id={question.id}
                                i={i}
                            />
                            <div>
                                <img
                                    width="150px"
                                    height="150px"
                                    src={`${answers[i].attributes.answer}`}
                                    alt="ss"
                                />
                            </div>
                        </div>
                    ) : (
                        <TextField
                            type={question.attributes.type}
                            sx={{ margin: '0 0 10px 0' }}
                            label={question.attributes.text}
                            name={`answer${i}`}
                            value={answers[i].attributes.answer}
                            onInput={(e) => handleAChange(e.target.value, i)}
                        />
                    )}

                    <Divider />
                </div>
            );
        })
    );
};
export default Answers;
