import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const getProfilesByStatus = async (status, page) => {
    const profiles = await axiosInstance.get(
        `/profiles?filters[status][$eq]=${status}&sort=createdAt&populate=*&pagination[page]=${page}&pagination[pageSize]=9`
    );
    return profiles;
};

export const useProfiles = (status, page) => {
    return useQuery(
        ['profiles', status, page],
        () => getProfilesByStatus(status, page),
        {
            keepPreviousData: true,
        }
    );
};
