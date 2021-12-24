import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  //prettier-ignore
  'Accept': 'application/json',
};

export function requestGetUser(email, password) {
  return axios.post(
    process.env.REACT_APP_BASE_URL + '/auth/local',
    {
      identifier: email,
      password: password,
    },
    { headers: headers }
  );
}
