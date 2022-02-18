import { REGISTER_ERROR, SET_REGISTER } from '../actions/register';
const initialState = {
    name: '',
    email: '',
    password: '',
    isError: false,
};

export default (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case SET_REGISTER:
            return {
                ...state,
                name: action.name,
                email: action.email,
                password: action.password,
                companyId: action.companyId,
                userRole: action.userRole,
                file: action.file,
                isError: false,
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
