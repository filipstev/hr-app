import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';

const Input = styled('input')({
    display: 'none',
});

export default function UploadAnswerImgButton({ onInput, id, i }) {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor={`button-${id}`}>
                <Input
                    style={{ display: 'none' }}
                    accept="image/*"
                    id={`button-${id}`}
                    multiple
                    type="file"
                    onInput={() => {
                        console.log('OnChange');
                    }}
                />
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
            <label htmlFor={`icon-${id}`}>
                <Input
                    style={{ display: 'none' }}
                    accept="image/*"
                    id={`icon-${id}`}
                    type="file"
                    onInput={() => {
                        console.log('OnChange');
                    }}
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
}
