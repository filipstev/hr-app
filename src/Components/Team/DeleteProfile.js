import axiosInstance from '../../helpers/axiosInstance';

const DeleteProfile = async (id) => {
    const profile = await axiosInstance.get(`/profiles/${id}?populate=*`);
    console.log('Profile Respone: ', profile);
    // const imgId = profile.data.data.attributes.profilePhoto.data.id;
    // const userId = profile.data.data.attributes.user.data.id;
    // console.log('Img ID: ', imgId);
    // console.log('User ID: ', userId);
    // const imageDelete = await axiosInstance.delete(`/upload/files/${imgId}`);
    // console.log('Image Delete: ', imageDelete);
    // await profile.attributes.answers.data.forEach((answer) => {
    //     axiosInstance.delete(`/answers/${answer.id}`);
    // });
    // await axiosInstance.delete(`/users/${userId}`);

    await axiosInstance.delete(`/profiles/${profile.data.data.id}`);
};

export default DeleteProfile;
