import axios from 'axios';
const headers = {
  'Content-Type': 'application/json',
  //prettier-ignore
  'Accept': 'application/json',
};
const baseURL = process.env.REACT_APP_BASE_URL;
console.log(baseURL);

// if (localStorage.token) {
//   headers.Authorization = `${localStorage.token}`;
// }

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: headers,
});

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      console.log(response.data.jwt);
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

// axiosInstance.interceptors.request.use(
//   (response) =>
//     new Promise((resolve, reject) => {
//       console.log(response);
//       resolve(response);
//     }),
//   (err) => {
//     if (!err.response) {
//       console.log('here');
//       return new Promise((resolve, reject) => {
//         reject(err);
//       });
//     }

//     if (err.response.status === 403) {
//       localStorage.removeItem('token');
//     } else {
//       console.log('here');

//       return new Promise((resolve, reject) => {
//         reject(err);
//       });
//     }
//   }
// );

export default axiosInstance;
