import axiosInstance from '../../../helpers/axiosInstance';

export function requestRegisterUser(name, email, password) {
    return axiosInstance.post('/auth/local/register', {
        name,
        email,
        password,
    });
}

export function createNewProfile(name, id) {
    return axiosInstance.post('/profiles', {
        data: {
            name: name,
            company: 2,
            user: id,
            userRole: 'company_user',
        },
    });
}
