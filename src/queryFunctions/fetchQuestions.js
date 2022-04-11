import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const fetchQuestions = async (companyName) => {
    const questions = await axiosInstance.get(
        `/questions?populate=*&sort[order]=asc&filters[company][name][$eq]=${companyName}`
    );
    return questions.data.data;
};

export const useGetQuestions = (companyName) => {
    return useQuery(['questions', companyName], () =>
        fetchQuestions(companyName)
    );
};
