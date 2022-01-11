import axiosInstance from '../../../helpers/axiosInstance';
// MUI

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const TeamHeader = ({ userStatus, id, setUserStatus, param }) => {
    // console.log(params);
    const navigate = useNavigate();
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            paddingBottom="25px"
        >
            <Grid item alignItems="center" display="flex">
                <Typography sx={{ fontWeight: 'bold' }}>
                    {/* {status === 'team' ? Edit Team Member : Moderate Team Member Entry} */}
                </Typography>
            </Grid>
            <Grid item display="flex" justifyContent="flex-end">
                <FormControl style={{ display: 'flex', flexDirection: 'row' }}>
                    <InputLabel id="demo-simple-select-label">
                        Status
                    </InputLabel>
                    <Select
                        style={{ paddingLeft: '16px' }}
                        labelId="selectStatus"
                        id="selectStatus"
                        label="Status"
                        value={userStatus}
                        onChange={(e) => {
                            console.log(e.target.value);
                            axiosInstance
                                .put(`/profiles/${id}`, {
                                    data: {
                                        status: e.target.value,
                                    },
                                })
                                .then(() => {
                                    setUserStatus(e.target.value);
                                })
                                .catch((err) => {
                                    console.error(err);
                                });
                        }}
                    >
                        <MenuItem value={'published'}>Published</MenuItem>
                        <MenuItem value={'pending'}>Pending</MenuItem>
                    </Select>
                    <Button
                        variant="outlined"
                        onClick={(e) => {
                            axiosInstance.delete(`/profiles/${id}`);
                            navigate('/profiles');
                        }}
                    >
                        Delete
                    </Button>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default TeamHeader;
