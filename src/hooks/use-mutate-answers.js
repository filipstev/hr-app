import { useMutation, useQueryClient } from 'react-query';

export const useMutateAnswers = (mutation) => {
    const queryClient = useQueryClient();

    return useMutation(mutation, {
        onMutate: async (data) => {
            console.log('data: ', data);
            console.log('Data ID: ', data.answerID);
            console.log('Data DATA: ', data.data);
            await queryClient.cancelQueries(['answers', data.id]);
            const previousValue = queryClient.getQueryData(['answers', '91']);
            console.log('PrevValue: ', previousValue);
            // queryClient.setQueryData(['answers', data.id], (old) => {
            //     console.log('old', old);
            // return {
            //     ...old,
            //     data: {
            //         ...old.data,
            //         attributes: {
            //             answer: data.answer,
            //         },
            //     },
            // };
            // });

            // console.log('bla', queryClient.getQueryData(['answers', data.id]));

            // return previousValue;
        },
        // onSuccess: (data, variables) => {
        //     console.log('Data', data.data.data);
        //     console.log('Variables: ', variables);
        //     queryClient.setQueryData(['answers', { id: variables.id }], data);
        // },
    });
};
