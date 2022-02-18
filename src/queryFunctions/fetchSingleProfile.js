import { useQuery, useQueryClient } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const fetchProfile = async (id) => {
    const profile = await axiosInstance.get(`/profiles/${id}?populate=*`);
    return profile;
};

export const useGetProfile = (id) => {
    // const queryClient = useQueryClient();
    return useQuery(['profile', id], () => fetchProfile(id), {
        select: (data) => {
            const profile = data.data.data;
            return profile;
        },
        // initialData: () => {
        //     const singleProfile = queryClient
        //         .getQueryData([
        //             'profiles',
        //             'pending',
        //             1,
        //             {
        //                 name: 'Tesla',
        //                 slug: 'tesla',
        //             },
        //         ])
        //         .data.data.find((profile) => profile.id === +id);
        //     console.log(
        //         'query client: ',
        //         queryClient
        //             .getQueryData([
        //                 'profiles',
        //                 'pending',
        //                 1,
        //                 {
        //                     name: 'Tesla',
        //                     slug: 'tesla',
        //                 },
        //             ])
        //             .data.data.find((profile) => profile.id === +id)
        //     );
        //     if (singleProfile) {
        //         console.log('Fetch S P', singleProfile);
        //         return {
        //             data: singleProfile,
        //         };
        //     } else {
        //         return undefined;
        //     }
        // },
    });
};
