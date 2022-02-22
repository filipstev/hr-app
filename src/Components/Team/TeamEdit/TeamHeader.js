import axiosInstance from '../../../helpers/axiosInstance';

import { useGetProfile } from '../../../queryFunctions/fetchSingleProfile';
import { useMutateProfile } from '../../../hooks/use-mutate-profile';

import { useNavigate, useParams } from 'react-router-dom';

import DeleteProfile from '../DeleteProfile';

// MUI
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

const TeamHeader = ({ edit }) => {
    const navigate = useNavigate();

    const { id } = useParams();
    const { data, isLoading } = useGetProfile(id);

    const editProfile = useMutateProfile((data) => {
        return axiosInstance.put(`/profiles/${id}`, data);
    });

    if (isLoading) {
        return <p>Loading</p>;
    }
    return (
        <Grid
            container
            sx={{
                flexDirection: { xs: 'column', md: 'row' },
                alignContent: { xs: 'center', md: 'space-between' },
                justifyContent: { md: 'space-between' },
                textAlign: 'center',
                paddingBottom: '25px',
            }}
        >
            <Grid
                item
                alignItems="center"
                display="flex"
                sx={{ alignSelf: 'center' }}
            >
                <Typography sx={{ fontWeight: 'bold' }}>
                    {edit === 'editPublished'
                        ? 'Edit Team Member'
                        : 'Moderate Team Member Entry'}
                </Typography>
            </Grid>
            <Grid item display="flex" sx={{ justifyContent: 'space-between' }}>
                <FormControl style={{ display: 'flex', flexDirection: 'row' }}>
                    {edit === 'editPublished' ? (
                        <>
                            <InputLabel id="selectStatus">Status</InputLabel>
                            <Select
                                style={{ paddingLeft: '16px' }}
                                labelId="selectStatus"
                                id="selectStatus"
                                label="Status"
                                value={data.attributes.status}
                                onChange={(e) => {
                                    editProfile.mutate({
                                        data: {
                                            status: e.target.value,
                                        },
                                        id,
                                    });
                                }}
                            >
                                <MenuItem value={'published'}>
                                    Published
                                </MenuItem>
                                <MenuItem value={'pending'}>Pending</MenuItem>
                            </Select>
                        </>
                    ) : (
                        <Button
                            variant="outlined"
                            sx={{ marginRight: '10px' }}
                            onClick={() => {
                                editProfile.mutate({
                                    data: {
                                        status: 'published',
                                    },
                                    id,
                                });
                            }}
                        >
                            approve
                        </Button>
                    )}
                    <Button
                        variant="outlined"
                        onClick={() => {
                            DeleteProfile(id);

                            if (edit === 'editPublished') {
                                navigate('/team');
                                return;
                            }
                            navigate('/team/pending');
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
