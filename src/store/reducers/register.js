import { REGISTER_ERROR, SET_REGISTER } from '../actions/register';
const initialState = {
  name: '',
  email: '',
  password: '',
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SET_REGISTER:
      return {
        ...state,
        name: action.name,
        email:action.email,
        password: action.password
      };
    case REGISTER_ERROR:
      return {
        ...state,
        isError: true,
      };

    default:
      return state;
  }
};
