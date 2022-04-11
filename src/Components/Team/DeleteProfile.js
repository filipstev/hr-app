const DeleteProfile = async ({
    profiles,
    id,
    deleteAnswers,
    deleteImage,
    deleteProfile,
    deleteUser,
    queryClient,
}) => {
    // Get Profile info;
    const profile = profiles.data.find((profile) => profile.id === id);
    // // Make const for id's for easier use;
    const img = profile.attributes.profilePhoto.data;
    const user = profile.attributes.user.data;
    const answers = profile.attributes.answers.data;
    // Check if we have imgId, so we don't get error;
    if (img) {
        deleteImage.mutate(img.id, {
            onSuccess: () => {
                return console.log('123');
            },
            onError: (err) => {
                console.log('123', err);
            },
            onSettled: () => {
                console.log('settled');
            },
        });
    }
    // // Check if we have userId, so we don't get error;
    if (user) {
        deleteUser.mutate(user.id, {
            onSuccess: () => {
                console.log('success');
            },
            onError: (err) => {
                console.log(err);
            },
            onSettled: () => {
                console.log('settled');
            },
        });
    }
    // Check if we have answers, so we don't get error;
    if (answers.length > 0) {
        answers.forEach((answer) => {
            deleteAnswers.mutate(answer.id);
        });
    }
    // Finaly, delete profile
    deleteProfile.mutate(profile.id, {
        onSuccess: () => {
            return queryClient.invalidateQueries('profiles');
        },
        onSettled: () => {
            console.log('settled');
        },
    });
};
export default DeleteProfile;
