import axiosInstance from '../../../helpers/axiosInstance';

export function requestRegisterUser(name, email, password) {
    return axiosInstance.post('/auth/local/register', {
        name,
        email,
        password,
    });
}

export function createNewProfile(name, id, companyId, photoId) {
    return axiosInstance.post('/profiles', {
        data: {
            name: name,
            company: companyId,
            user: id,
            userRole: 'company_user',
            profilePhoto: photoId,
        },
    });
}

export function uploadAndConnectImage(file) {
    return axiosInstance.post('/upload', file);
}
