import axiosInstance from '../../../helpers/axiosInstance';
// MUI

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TeamHeader = () => {
    const [userStatus, setUserStatus] = useState('');

    const params = useParams();

    const { id } = params;

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`/profiles/${id}`).then(({ data }) => {
            const status = data.data.attributes.status;
            setUserStatus(status);
        });
        return () => {
            console.log('cleanup');
        };
    }, [id]);
    const handleStatusChange = () => {
        return (
            <>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                    style={{ paddingLeft: '16px' }}
                    labelId="selectStatus"
                    id="selectStatus"
                    label="Status"
                    value={userStatus}
                    onChange={(e) => {
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
            </>
        );
    };
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            paddingBottom="25px"
        >
            <Grid item alignItems="center" display="flex">
                <Typography sx={{ fontWeight: 'bold' }}>
                    {!params.status
                        ? 'Edit Team Member'
                        : 'Moderate Team Member Entry'}
                </Typography>
            </Grid>
            <Grid item display="flex" justifyContent="flex-end">
                <FormControl style={{ display: 'flex', flexDirection: 'row' }}>
                    {handleStatusChange()}
                    <Button
                        variant="outlined"
                        onClick={(e) => {
                            axiosInstance.delete(`/profiles/${id}`);
                            navigate('/team');
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
