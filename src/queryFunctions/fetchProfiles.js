import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const getProfilesByStatus = async (status, page, company) => {
    const profiles = await axiosInstance
        .get(
            `/profiles?filters[status][$eq]=${status}&filters[company][name][$eq]=${company}&sort=createdAt&populate=*&pagination[page]=${page}&pagination[pageSize]=5`
        )
        .then((res) => res.data);
    return profiles;
};

export const useProfiles = (status, page, company) => {
    return useQuery(
        ['profiles', status, page, company],
        () => getProfilesByStatus(status, page, company),
        {
            keepPreviousData: true,
        }
    );
};
