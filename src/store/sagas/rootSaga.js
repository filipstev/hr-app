import { takeLatest } from 'redux-saga/effects';

import { LOGIN_USER } from '../actions/user';
import {REGISTER_USER } from '../actions/register'

import { handleLoginUser } from './handlers/user';
import { handleRegisterUser } from './handlers/register';

export function* watcherSaga() {
  yield takeLatest(LOGIN_USER, handleLoginUser);
  yield takeLatest(REGISTER_USER, handleRegisterUser);
}
