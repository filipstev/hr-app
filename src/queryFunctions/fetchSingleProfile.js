import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const fetchProfile = async (id) => {
    const profile = await axiosInstance
        .get(`/profiles/${id}?populate=*`)
        .then((res) => res.data);
    return profile;
};

export const useGetProfile = (id) => {
    return useQuery(['profile', id], () => fetchProfile(id));
};
