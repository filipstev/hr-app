export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const SET_REGISTER = 'SET_USER';

export const registerUser = (name, email, password) => ({
    type: REGISTER_USER,
    name,
    email,
    password,
});

// Maybe reuse this component
// export const setUser = (user) => ({
//   type: SET_REGISTER,
//   payload: user,
// });

export const registerError = () => ({
    type: REGISTER_ERROR,
});
