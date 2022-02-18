import { Divider, TextField } from '@mui/material';

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
                <>
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
                            <div style={{ width: '150px', height: '150px' }}>
                                <img
                                    width="150px"
                                    height="150px"
                                    src={`${answers[i].attributes.answer}`}
                                    alt="some alt text"
                                />
                            </div>
                            <TextField
                                type={'file'}
                                sx={{ margin: '0 0 10px 0', width: '100%' }}
                                name={`answer${i}`}
                                onInput={(e) => {
                                    const img = new FormData();
                                    img.append('files', e.target.files[0]);
                                    handleAimgChange(img, i);
                                }}
                            />
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
                </>
            );
        })
    );
};
export default Answers;
