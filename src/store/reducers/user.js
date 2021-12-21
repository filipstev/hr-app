import * as actionTypes from '../actionTypes/user';

const initialState = {
  user: {},
  isLoggedIn: false,
  isError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isError: false,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
};
