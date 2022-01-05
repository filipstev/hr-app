import axiosInstance from '../../../helpers/axiosInstance';

export function requestRegisterUser(name, email, password) {
    return axiosInstance.post('/auth/local/register', {
        name,
        email,
        password,
    });
}
