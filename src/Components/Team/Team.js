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

const Team = ({ status }) => {
    const userId = useSelector((state) => state.user.user.user.id);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [link, setLink] = useState(false);
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    // Get User Company so we can filter profiles by Company Name
    const { data: company, isFetched } = useCompany(userId);
    const {
        data: profiles,
        isLoading,
        isFetching,
    } = useProfiles(status, page, companyName);

    const inviteNewMember = useMutation((data) => {
        return axiosInstance.post(`/invite`, data);
    });

    const handlePageChange = (event, value) => {
        setPage(value);
    };
    // Set company name on fetch
    useEffect(() => {
        isFetched && setCompanyName(company[0].attributes.name);
    }, [company, isFetched]);

    // Set page count when profiles are fetched
    useEffect(() => {
        !isLoading && setPageCount(profiles.meta.pagination.pageCount);
    }, [profiles, isLoading]);

    useEffect(() => {
        setPage(1);
    }, []);

    if (isFetching || !isFetched) {
        return <p style={{ marginTop: '150px' }}>Is Loading...</p>;
    }

    return (
        <Container maxWidth="false">
            <Grid
                container
                sx={{ marginTop: '100px', justifyContent: 'space-between' }}
            >
                <Typography>
                    {status === 'published' ? 'Team' : 'Pending for approval'}
                </Typography>

                {status === 'published' && (
                    <Button
                        onClick={() => {
                            setLink(!link);
                        }}
                    >
                        + Add New Team Member
                    </Button>
                )}
            </Grid>
            {link && (
                <form
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
                    <label>
                        Input Recipient here:
                        <input
                            type="text"
                            onInput={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </label>
                    <button type="submit">Send Invite</button>
                    {inviteNewMember.isSuccess && (
                        <p>Invite Sent Successfully</p>
                    )}
                </form>
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
            <Grid container spacing={2} sx={{ marginLeft: 0 }}>
                <ShowProfiles status={status} profiles={profiles} />
            </Grid>
        </Container>
    );
};

export default Team;
