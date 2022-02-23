import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
    display: 'none',
});

const UploadButton = ({ onUpload, id }) => {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor={`button-${id}`}>
                <Input
                    accept="image/*"
                    id={`button-${id}`}
                    type="file"
                    onInput={(e) => {
                        console.log('123');
                        onUpload(e);
                    }}
                />
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
            <label htmlFor={`icon-${id}`}>
                <Input
                    accept="image/*"
                    id={`icon-${id}`}
                    type="file"
                    onInput={(e) => onUpload(e)}
                />
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                >
                    <PhotoCamera />
                </IconButton>
            </label>
        </Stack>
    );
};

export default UploadButton;
