import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const getImage = async (imageUrl) => {
    const image = await axiosInstance
        .get(`/upload/files?filters[url][$eq]=${imageUrl}`)
        .then((res) => res.data[0].id);
    return image;
};

export const useFetchImage = (imageUrl) => {
    return useQuery(['image', imageUrl], () => getImage(imageUrl));
};
