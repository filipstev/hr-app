import {
    Button,
    Divider,
    FormControl,
    Grid,
    TextField,
    Typography,
} from '@mui/material';

const ShowQuestions = ({ questions, answers }) => {
    console.log('ShowQuestions.js Answers: ', answers);
    return (
        <Grid item width="40%" border="1px solid black" padding="10px">
            <FormControl
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 'bold',
                        borderBottom: '1px solid black',
                    }}
                >
                    Answers
                </Typography>
                <br></br>
                {!questions ? (
                    <p>Loading...</p>
                ) : (
                    questions.map((question, i) => (
                        <>
                            <label>{question.attributes.text}</label>
                            <TextField
                                type={question.attributes.type}
                                sx={{ margin: '0 0 10px 0' }}
                                value={answers[i].attributes.answer}
                            />
                            <Divider />
                        </>
                    ))
                )}
                <Button
                    variant="outlined"
                    type="submit"
                    sx={{ marginTop: '15px' }}
                >
                    Save
                </Button>
            </FormControl>
        </Grid>
    );
};

export default ShowQuestions;
