import axios from 'axios';
const headers = {
    'Content-Type': 'application/json',
    //prettier-ignore
    'Accept': 'application/json',
};
const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: headers,
});

axiosInstance.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response);
        }),
    (err) => {
        if (!err.response) {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        }

        if (err.response.status === 401) {
            localStorage.removeItem('user');
            console.log('Kada refreshuje login');
            return (window.location.href = '/');
            // console.log(err.response.status);
        } else {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        }
    }
);

axiosInstance.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(localStorage.getItem('user'));
            config.headers.Authorization = `Bearer ${parsedUser.jwt}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
