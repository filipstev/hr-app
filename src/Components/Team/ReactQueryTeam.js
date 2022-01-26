import { ReactQueryDevtools } from 'react-query/devtools';
import { useQuery } from 'react-query';
import React from 'react';
import axiosInstance from '../../helpers/axiosInstance';

export const Profiles = () => {
    const fetchTodoList = async () => {
        const profiles = await axiosInstance.get(
            `/profiles?filters[status][$eq]=${'pending'}&sort=createdAt&populate=*&pagination[pageSize]=50`
        );
        return profiles;
    };
    const { data: profiles, status } = useQuery('profiles', fetchTodoList);
    console.log(profiles.data);
    if (status.loading) {
        return <div>Loading...</div>;
    }
    if (status.error) {
        return <div>Error</div>;
    }
    return (
        <div style={{ marginTop: '100px' }}>
            <ReactQueryDevtools />
        </div>
    );
};

const ReactQueryTeam = () => {
    return <Profiles />;
};

export default ReactQueryTeam;
