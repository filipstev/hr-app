import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const getProfilesByStatus = async (status) => {
    const profiles = await axiosInstance.get(
        `/profiles?filters[status][$eq]=${status}&sort=createdAt&populate=*&pagination[pageSize]=50`
    );
    return profiles;
};

export const useProfiles = (status) => {
    return useQuery(['profiles', status], () => getProfilesByStatus(status), {
        endabled: !!status,
    });
};
