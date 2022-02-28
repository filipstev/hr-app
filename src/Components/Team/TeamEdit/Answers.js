import { Divider, TextField } from '@mui/material';
import UploadAnswerImgButton from '../../Buttons/UploadAnswerImgButton';
const Answers = ({
    questions,
    answers,
    handleAChange,
    handleAimgChange,
    image,
}) => {
    if (!answers) {
        answers = [];
    }
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
                <div
                    key={question.attributes.text}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <label>
                        {`Question ${i + 1} - `}
                        {question.attributes.text}
                    </label>
                    {question.attributes.type === 'image' ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
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
                                    src={
                                        !image
                                            ? `${answers[i].attributes.answer}`
                                            : URL.createObjectURL(
                                                  image.image[0]
                                              )
                                    }
                                    alt="ss"
                                />
                            </div>
                        </div>
                    ) : (
                        <TextField
                            type={question.attributes.type}
                            sx={{ margin: '0 0 10px 0', color: 'primary' }}
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
