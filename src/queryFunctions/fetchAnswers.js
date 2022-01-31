import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const fetchAnswers = async (id) => {
    const answers = await axiosInstance
        .get(`/answers/?filters[profile][id][$eq]=${id}&populate=*`)
        .then((res) => res.data.data);
    return answers;
};

export const useGetAnswersOfProfile = (id) => {
    return useQuery(['answers', id], () => fetchAnswers(id));
};
