import axios from 'axios';
import * as actionTypes from '../actionTypes/user';
const headers = {
  'Content-Type': 'application/json',
  //prettier-ignore
  'Accept': 'application/json',
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    axios
      .post(
        process.env.REACT_APP_BASE_URL + '/auth/local',
        {
          identifier: email,
          password: password,
        },
        { headers: headers }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log('uspeh');
          const user = {
            jwt: response.data.jwt,
            user: response.data.user,
          };
          dispatch({ type: actionTypes.LOGIN_USER, payload: user });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: actionTypes.LOGIN_ERROR });
      });
  };
};
