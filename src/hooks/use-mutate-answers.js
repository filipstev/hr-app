import { useMutation, useQueryClient } from 'react-query';

export const useMutateAnswers = (mutation) => {
    const queryClient = useQueryClient();

    return useMutation(mutation, {
        onSuccess: (data, variables) => {
            console.log('Data', data.data.data);
            console.log('Variables: ', variables);
            queryClient.setQueryData(['answers', { id: variables.id }], data);
        },
    });
};
