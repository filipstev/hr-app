import { ReactQueryDevtools } from 'react-query/devtools';
import { useQuery, useQueryClient } from 'react-query';
import axiosInstance from '../../helpers/axiosInstance';

const fetchProfiles = async () => {
    const profiles = await axiosInstance.get(`/profiles`);
    return profiles;
};

const ReactQueryTeam = () => {
    const { data, status } = useQuery('profiles', fetchProfiles);
    console.log(data);
    return (
        <>
            <ReactQueryDevtools />
        </>
    );
};

export default ReactQueryTeam;
