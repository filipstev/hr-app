import axiosInstance from '../../../helpers/axiosInstance';

export function requestRegisterUser(name,email, password) {
  console.log('Name: ' + name);
  console.log('Email' + email);
  console.log('Password' + password);

  return axiosInstance.post('/auth/local/register', {
    name,
    email,
    password
  });
}
