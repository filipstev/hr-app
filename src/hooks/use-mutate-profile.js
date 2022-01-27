import { useMutation, useQueryClient } from 'react-query';

export const useMutateProfile = (mutation) => {
    const queryClient = useQueryClient();

    return useMutation(mutation, {
        onSuccess: ({ data, id }) => {
            // queryClient.invalidateQueries(['profile', id], data);
            queryClient.invalidateQueries(['profile', id]);
        },
        // onMutate: async (data) => {
        //     // console.log('DATA: ', data);
        //     await queryClient.cancelQueries(['profile', data.id]);
        //     const previousValue = queryClient.getQueryData([
        //         'profile',
        //         data.id,
        //     ]);
        //     // console.log('PreviousValue 1: ', previousValue);
        //     queryClient.setQueryData(['profile', data.id], (old) => {
        //         const newData = data.data;
        //         // console.log('OLD: ', old.data.data);
        //         // console.log('Data in SetQueryData: ', data);
        //         // console.log('ASDF:', old.data.data);
        //         return {
        //             ...old,
        //             data: {
        //                 ...old.data,
        //                 data: {
        //                     ...old.data.data,
        //                     attributes: {
        //                         ...old.data.data.attributes,
        //                         name: newData.name,
        //                         profilePhoto: newData.profilePhoto,
        //                     },
        //                 },
        //             },
        //         };
        //     });
        //     return { previousValue, data };
        // },
        // // On failure, roll back to the previous value
        // onError: (err, variables, previousValue) => {
        //     return queryClient.setQueryData(
        //         ['profile', variables.id],
        //         previousValue
        //     );
        // },
        // // After success or failure, refetch the Profile query
        // onSettled: (variables) => {
        //     queryClient.invalidateQueries(['profile', variables.data.data.id]);
        //     queryClient.invalidateQueries(['profiles']);
        // },
    });
};
