import { call, put } from 'redux-saga/effects';
import { loginError, setUser, signIn } from '../../actions/user';
import { requestGetUser } from '../requests/user';

export function* handleLoginUser(action) {
  try {
    const response = yield call(() =>
      requestGetUser(action.email, action.password)
    );
    if (response.status === 200) {
      const user = {
        jwt: response.data.jwt,
        user: response.data.user,
      };
      yield put(setUser(user));
    }
  } catch (err) {
    console.log(err);
    yield put(loginError());
  }
}
