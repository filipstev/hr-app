import { takeLatest } from 'redux-saga/effects';
import { LOGIN_USER } from '../actions/user';
import { handleLoginUser } from './handlers/user';

export function* watcherSaga() {
  yield takeLatest(LOGIN_USER, handleLoginUser);
}
