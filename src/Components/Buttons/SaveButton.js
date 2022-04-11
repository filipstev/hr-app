import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
const SaveButton = () => {
    return (
        <Button
            variant="outlined"
            type="submit"
            endIcon={<SaveIcon />}
            sx={{ marginTop: '15px' }}
        >
            Save
        </Button>
    );
};

export default SaveButton;
