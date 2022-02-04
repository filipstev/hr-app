import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const getCompany = async (userId) => {
    const company = await axiosInstance
        .get(`/companies?filters[profiles][user][id][$eq]=${userId}`)
        .then((res) => res.data.data);
    return company;
};

export const useCompany = (userId) => {
    return useQuery(['Company', userId], () => getCompany(userId));
};
