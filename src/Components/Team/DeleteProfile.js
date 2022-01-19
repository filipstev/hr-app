import axiosInstance from '../../helpers/axiosInstance';

const DeleteProfile = async (id) => {
    // Get Profile info;
    const profile = await axiosInstance.get(`/profiles/${id}?populate=*`);
    console.log('Profile Respone: ', profile);
    // Make const for id's for easier use;
    const profileId = profile.data.data;
    const imgId = profile.data.data.attributes.profilePhoto.data;
    const userId = profile.data.data.attributes.user.data;
    const answers = profile.data.data.attributes.answers.data;
    // Log, because console.log is fun;
    console.log('Profile ID: ', profileId);
    console.log('Img ID: ', imgId);
    console.log('User ID: ', userId);
    // Check if we have imgId, so we don't get error;
    if (imgId) {
        const imageDelete = await axiosInstance.delete(
            `/upload/files/${imgId.id}`
        );
        console.log('Image Delete: ', imageDelete);
    }
    // Check if we have userId, so we don't get error;
    if (userId) {
        const userDelete = await axiosInstance.delete(`/users/${userId.id}`);
        // Don't know why user delete returns undefined,
        // It's deleting user anyway, no need to fret;
        console.log('User Delete: ', userDelete);
    }

    // Check if we have answers, so we don't get error;

    const answerDelete = await answers.forEach((answer) => {
        axiosInstance.delete(`/answers/${answer.id}`);
    });
    console.log(answerDelete);
    // Finaly, delete profile
    const profileDelete = await axiosInstance.delete(
        `/profiles/${profileId.id}`
    );
    console.log('Profile Delete: ', profileDelete);
};

export default DeleteProfile;
