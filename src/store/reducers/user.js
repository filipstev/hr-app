import { INVALID_TOKEN, LOGIN_ERROR, SET_USER } from '../actions/user';
const initialState = {
    user: {},
    isLoggedIn: false,
    isError: false,
    role: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
                isError: false,
                role: action.payload.role,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                isError: true,
            };
        case INVALID_TOKEN:
            return {
                ...state,
                isError: true,
                isLoggedIn: false,
                user: {},
            };

        default:
            return state;
    }
};
