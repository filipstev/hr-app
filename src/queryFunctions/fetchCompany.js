import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const getCompany = async (userId) => {
    const company = await axiosInstance.get(
        `/companies?filters[profiles][user][id][$eq]=${userId}`
    );
    return company;
};

export const useCompany = (userId) => {
    return useQuery(['Company', userId], () => getCompany(userId), {
        enabled: !!userId,
        select: (data) => {
            const company = {
                name: data.data.data[0].attributes.name,
                slug: data.data.data[0].attributes.slug,
            };
            return company;
        },
    });
};
