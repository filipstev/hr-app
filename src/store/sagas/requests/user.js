import axiosInstance from '../../../helpers/axiosInstance';

export function requestGetUser(email, password) {
    console.log(email, password);
    return axiosInstance.post('/auth/local', {
        identifier: email,
        password: password,
    });
}
