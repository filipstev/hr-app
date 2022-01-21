import axiosInstance from '../../helpers/axiosInstance';

export const fetchProfiles = async () => {
    const profiles = await axiosInstance.get(`/profiles`);
    return profiles;
};
