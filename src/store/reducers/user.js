import {
    INVALID_TOKEN,
    LOGIN_ERROR,
    SET_USER,
    LOGIN_START,
} from '../actions/user';
const initialState = {
    user: {},
    isLoggedIn: false,
    isError: false,
    role: null,
    isLoading: false,
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
                isLoading: false,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false,
            };
        case INVALID_TOKEN:
            return {
                ...state,
                isError: true,
                isLoggedIn: false,
                user: {},
                isLoading: false,
            };
        case LOGIN_START:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }
};
