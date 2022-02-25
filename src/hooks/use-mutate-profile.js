import { useMutation, useQueryClient } from 'react-query';

export const useMutateProfile = (mutation) => {
    const queryClient = useQueryClient();

    return useMutation(mutation, {
        onMutate: async (data) => {
            console.log(data);
            await queryClient.cancelQueries(['profile', data.id]);
            const previousValue = queryClient.getQueryData([
                'profile',
                data.id,
            ]);

            queryClient.setQueryData(['profile', data.id], (old) => {
                console.log(old);
                //     return {
                //         ...old,
                //         data: {
                //             ...old.data,
                //             attributes: {
                //                 ...old.data.attributes,
                //                 name: data.data.name,
                //             },
                //         },
                //     };
            });

            return previousValue;
        },
        // On failure, roll back to the previous value
        onError: (err, variables, previousValue) => {
            return queryClient.setQueryData(
                ['profile', variables.id],
                previousValue
            );
        },
        // After success or failure, refetch the Profile query
        onSettled: (variables) => {
            queryClient.invalidateQueries(['profiles']);
            queryClient.invalidateQueries(['profile', variables.data.data.id]);
        },
    });
};
