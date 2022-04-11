import jwtDecode from 'jwt-decode';
import { call, put } from 'redux-saga/effects';
import { loginError, loginStart, setUser, signIn } from '../../actions/user';
import { checkUserProfile, requestGetUser } from '../requests/user';

export function* handleLoginUser(action) {
    try {
        yield put(loginStart());
        const response = yield call(() =>
            requestGetUser(action.email, action.password)
        );
        if (response.status === 200) {
            const profile = yield call(() =>
                checkUserProfile(response.data.user.id)
            );
            const user = {
                jwt: response.data.jwt,
                user: response.data.user,
                role: profile.data.data[0].attributes.userRole,
            };

            localStorage.setItem('user', JSON.stringify(user));

            yield put(setUser(user));
        }
    } catch (err) {
        console.log(err);
        yield put(loginError());
    }
}
