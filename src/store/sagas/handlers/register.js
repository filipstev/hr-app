import { call, put } from 'redux-saga/effects';
import { registerError, registerUser } from '../../actions/register';
import {
    createNewProfile,
    requestRegisterUser,
    uploadAndConnectImage,
} from '../requests/register';
import { requestGetUser } from '../requests/user';
import { handleLoginUser } from './user';
import { setUser } from '../../actions/user';
import axiosInstance from '../../../helpers/axiosInstance';

export function* handleRegisterUser(action) {
    console.log('handleRegisterUser: ');
    console.log(action);

    try {
        const response = yield call(() =>
            requestRegisterUser(action.name, action.email, action.password)
        );
        console.log(response);
        if (response.status !== 200) {
            yield put(setUser(action.name, action.email, action.password));
        }

        if (response.status === 200) {
            const response = yield call(() =>
                requestGetUser(action.email, action.password)
            );
            console.log(response);
            if (response.status === 200) {
                const user = {
                    jwt: response.data.jwt,
                    user: response.data.user,
                };

                localStorage.setItem('user', JSON.stringify(user));

                const imageResponse = yield call(() => {
                    uploadAndConnectImage(action.file).then((res) => {
                        createNewProfile(
                            action.name,
                            user.user.id,
                            action.companyId,
                            res.data[0].id
                        );
                    });
                });

                if (imageResponse !== 200) {
                    createNewProfile(
                        action.name,
                        user.user.id,
                        action.companyId
                    );
                }

                yield put(setUser(user));
            }
        }
    } catch (err) {
        console.log(err);
        yield put(registerError());
    }
}
