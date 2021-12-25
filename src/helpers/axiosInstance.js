import axios from 'axios';
const headers = {
  'Content-Type': 'application/json',
  //prettier-ignore
  'Accept': 'application/json',
};
const baseURL = process.env.REACT_APP_BASE_URL;

if (localStorage.user) {
  const parsedUser = JSON.parse(localStorage.user);
  headers.Authorization = `Bearer ${parsedUser.jwt}`;
}

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

    if (err.response.status === 403) {
      localStorage.removeItem('user');
    } else {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  }
);

axiosInstance.interceptors.request.use(
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

    if (err.response.status === 403) {
      localStorage.removeItem('token');
    } else {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  }
);

export default axiosInstance;
