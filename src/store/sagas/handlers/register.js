import { call, put } from "redux-saga/effects";
import { registerError, registerUser } from "../../actions/register";
import { requestRegisterUser } from "../requests/register";

export function* handleRegisterUser(action) {
  console.log("handleRegisterUser: ");
  console.log(action);

  try {
    const response = yield call(() =>
      requestRegisterUser(action.name, action.email, action.password)
    );
    console.log(response);
    if (response.status !== 200) {
      yield put(registerUser(action.name, action.email, action.password));
    }
  } catch (err) {
    console.log(err);
    yield put(registerError());
  }
}
