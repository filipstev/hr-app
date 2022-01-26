import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const fetchQuestions = async (id) => {
    const answers = await axiosInstance.get(
        `/api/answers/?filters[profile][id][$eq]=${id}&populate=*`
    );
    return answers;
};

export const useGetQuestions = (id) => {
    return useQuery(['questions', id], fetchQuestions(id));
};
