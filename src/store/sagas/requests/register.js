import axiosInstance from '../../../helpers/axiosInstance';

export function requestRegisterUser(name, email, password) {
    return axiosInstance.post('/auth/local/register', {
        name,
        email,
        password,
    });
}

export function createNewProfile({ name, id, companyId, photoId, userRole }) {
    console.log('Name:', name);
    console.log('ID:', id);
    console.log('Company ID:', companyId);
    console.log('Image ID:', photoId);
    console.log('User Role:', userRole);
    return axiosInstance.post('/profiles', {
        data: {
            name: name,
            company: `${companyId}`,
            user: id,
            userRole: userRole,
            profilePhoto: photoId,
        },
    });
}

export function uploadAndConnectImage(file) {
    return axiosInstance.post('/upload', file);
}
