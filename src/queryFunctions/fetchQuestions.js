import { useQuery } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const fetchQuestions = async () => {
    const questions = await axiosInstance.get(
        `/questions?populate=*&sort[order]=asc`
    );
    return questions;
};

export const useGetQuestions = () => {
    return useQuery(['questions'], fetchQuestions);
};
