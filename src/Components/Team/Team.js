import axiosInstance from '../../helpers/axiosInstance';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';

import ShowProfiles from './ShowProfiles';

import { useProfiles } from '../../queryFunctions/fetchProfiles';
import { useCompany } from '../../queryFunctions/fetchCompany';
import { FormControl, TextField } from '@mui/material';

import Spinner from '../Spinner.js/Spinner';

const Team = ({ status }) => {
    const userId = useSelector((state) => state.user.user.user.id);
    const [page, setPage] = useState(1);

    // Get User Company so we can filter profiles by Company Name
    const { data: company } = useCompany(userId);

    const { data: profiles, status: profileStatus } = useProfiles(
        status,
        page,
        company
    );

    const [link, setLink] = useState(false);
    const [email, setEmail] = useState('');

    const pageCount = profiles?.meta.pagination.pageCount;

    const inviteNewMember = useMutation((data) => {
        return axiosInstance.post(`/invite`, data);
    });

    const handlePageChange = (event, value) => {
        setPage(value);
    };
    useEffect(() => {
        setPage(1);
    }, [status]);

    if (status !== 'published' && link === true) {
        setLink(!link);
    }

    if (profileStatus !== 'success') {
        return <Spinner />;
    }

    return (
        <Container maxWidth="false">
            <Grid
                container
                sx={{
                    marginTop: '100px',
                    justifyContent: 'space-between',
                }}
            >
                <Typography>
                    {status === 'published' ? 'Team' : 'Pending for approval'}
                </Typography>

                {status === 'published' && (
                    <Button
                        color="primary"
                        onClick={() => {
                            setLink(!link);
                        }}
                    >
                        + Add New Team Member
                    </Button>
                )}
            </Grid>
            {link && (
                <FormControl
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        inviteNewMember.mutate({
                            data: {
                                email: email,
                                companySlug: company[0].attributes.slug,
                            },
                        });
                    }}
                >
                    <TextField
                        label="Recipient Email"
                        id="invite"
                        type="text"
                        onInput={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Button type="submit">Send Invite</Button>
                    {inviteNewMember.isSuccess && (
                        <p>Invite Sent Successfully</p>
                    )}
                </FormControl>
            )}

            <Pagination
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                count={pageCount}
                page={page}
                showFirstButton
                showLastButton
                onChange={handlePageChange}
            />
            <Grid
                container
                rowSpacing={{ xs: 2 }}
                columnSpacing={{ md: 2 }}
                sx={{
                    marginLeft: 0,
                    justifyContent: {
                        xs: 'center',
                        sm: 'space-between',
                        md: 'unset',
                    },
                }}
            >
                <ShowProfiles status={status} profiles={profiles} />
            </Grid>
        </Container>
    );
};

export default Team;
