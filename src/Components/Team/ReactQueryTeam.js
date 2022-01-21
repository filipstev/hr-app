import { ReactQueryDevtools } from 'react-query/devtools';
import { useQuery } from 'react-query';
import React from 'react';
import axiosInstance from '../../helpers/axiosInstance';

const fetchTodoList = async (status) => {
    const profiles = await axiosInstance.get(
        `/profiles?filters[status][$eq]=${status}&sort=createdAt&populate=*&pagination[pageSize]=50`
    );
    return profiles;
};

const ReactQueryTeam = () => {
    const info = useQuery('profiles', fetchTodoList);
    console.log(info.data.data.data);
    return (
        <div style={{ marginTop: '100px' }}>
            {info.data.data.data.map((profile) => {
                return <p>{profile.attributes.name}</p>;
            })}
            <ReactQueryDevtools />
        </div>
    );
};

export default ReactQueryTeam;
