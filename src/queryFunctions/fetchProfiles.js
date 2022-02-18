import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const getProfilesByStatus = async (status, page, company) => {
    const profiles = await axiosInstance.get(
        `/profiles?filters[status][$eq]=${status}&filters[company][name][$eq]=${company}&sort=createdAt&populate=*&pagination[page]=${page}&pagination[pageSize]=5`
    );
    return profiles;
};

export const useProfiles = (status, page, company) => {
    console.log(status, page, company);
    return useQuery(
        ['profiles', status, page, company],
        () => getProfilesByStatus(status, page, company.name),
        {
            enabled: !!company,
            select: (data) => {
                const profiles = data.data;
                return profiles;
            },
            keepPreviousData: true,
        }
    );
};
