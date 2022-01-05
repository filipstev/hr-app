export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SET_USER = 'SET_USER';
export const INVALID_TOKEN = 'INVALID_TOKEN';

export const signIn = (email, password) => ({
    type: LOGIN_USER,
    email: email,
    password: password,
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const loginError = () => ({
    type: LOGIN_ERROR,
});

export const tokenInvalid = () => ({
    type: INVALID_TOKEN,
});
