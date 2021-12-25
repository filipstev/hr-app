import { LOGIN_ERROR, SET_USER } from '../actions/user';
const initialState = {
  user: {},
  isLoggedIn: false,
  isError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log(action.payload);

      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isError: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isError: true,
      };

    default:
      return state;
  }
};
