import { useMutation, useQueryClient } from 'react-query';

export const useMutateProfile = (mutation) => {
    const queryClient = useQueryClient();

    return useMutation(mutation, {
        onMutate: async (data) => {
            console.log('DATA: ', data);
            await queryClient.cancelQueries(['profile', data.id]);
            const previousValue = queryClient.getQueryData([
                'profile',
                data.id,
            ]);

            queryClient.setQueryData(['profile', data.id], (old) => {
                console.log('OLD: ', old);
                console.log('Data in SetQueryData: ', data);
                return {
                    ...old,
                    data: {
                        ...old.data,
                        data: {
                            ...old.data.data,
                            attributes: {
                                ...old.data.data.attributes,
                                data: data.data.newData,
                            },
                        },
                    },
                };
            });
            console.log('PreviousValue: ', previousValue);
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
            queryClient.invalidateQueries('profile');
            queryClient.invalidateQueries('profiles');
        },
    });
};
