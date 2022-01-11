import {
    Button,
    FormControl,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import axiosInstance from '../../../helpers/axiosInstance';
const BasicInfo = ({ userName, setUserName, id }) => {
    /* Profile */
    return (
        <Grid
            item
            justifyContent="start"
            border="1px solid black"
            padding="10px"
        >
            <FormControl style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 'bold',
                        borderBottom: '1px solid black',
                    }}
                >
                    Basic Info
                </Typography>

                <label>Name</label>
                <TextField
                    type="text"
                    value={userName}
                    onInput={(e) => {
                        setUserName(e.target.value);
                    }}
                />
                <label>Upload Img</label>
                <TextField type="file" />
                <Button
                    variant="outlined"
                    type="submit"
                    sx={{ marginTop: '15px' }}
                    onClick={(e) => {
                        axiosInstance
                            .put(`/profiles/${id}`, {
                                data: {
                                    name: userName,
                                },
                            })
                            .catch((err) => {
                                console.error(new Error(err));
                            });
                    }}
                >
                    Save
                </Button>
            </FormControl>
        </Grid>
    );
};

export default BasicInfo;
