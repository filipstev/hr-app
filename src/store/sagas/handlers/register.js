import jwtDecode from 'jwt-decode';
import { call, put } from 'redux-saga/effects';
import { registerUser } from '../../actions/register';
import { requestRegisterUser } from '../requests/register';
import { requestGetUser } from '../requests/user';

export function* handleRegisterUser(action) {
  console.log('handleRegisterUser: ');
  console.log(action);
 
  try {
    const response = yield call(() =>
      requestRegisterUser(action.name,action.email, action.password)
    );
    console.log(response);
    if (response.status !== 200) {

      yield put(registerUser(action.name, action.email, action.password));
    }
  } catch (err) {
    console.log(err);
    yield put(Error);
  }

}
