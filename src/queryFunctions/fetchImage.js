import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const getImage = async (imageUrl) => {
    const image = await axiosInstance.get(
        `/upload/files?filters[url][$eq]=${imageUrl}`
    );
    return image;
};

export const useFetchImage = (imageUrl) => {
    return useQuery(['image', imageUrl], () => getImage(imageUrl), {
        enabled: !!imageUrl,
        select: (data) => {
            const image = data.data[0].id;
            return image;
        },
    });
};
