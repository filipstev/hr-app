import { call, put } from 'redux-saga/effects';
import { registerError } from '../../actions/register';
import {
    createNewProfile,
    requestRegisterUser,
    uploadAndConnectImage,
} from '../requests/register';
import { requestGetUser } from '../requests/user';
import { setUser } from '../../actions/user';

export function* handleRegisterUser(action) {
    console.log('handleRegisterUser: ');
    console.log(action);

    try {
        const response = yield call(() =>
            requestRegisterUser(action.name, action.email, action.password)
        );

        if (response.status !== 200) {
            yield put(setUser(action.name, action.email, action.password));
        }

        if (response.status === 200) {
            const response = yield call(() =>
                requestGetUser(action.email, action.password)
            );

            if (response.status === 200) {
                const user = {
                    jwt: response.data.jwt,
                    user: response.data.user,
                };

                localStorage.setItem('user', JSON.stringify(user));

                yield call(() => {
                    uploadAndConnectImage(action.file).then((res) => {
                        if (res.status === 200) {
                            createNewProfile(
                                action.name,
                                user.user.id,
                                action.companyId,
                                res.data[0].id
                            );
                            return;
                        }
                        createNewProfile(
                            action.name,
                            user.user.id,
                            action.companyId
                        );
                    });
                });

                yield put(setUser(user));
            }
        }
    } catch (err) {
        console.log(err);
        yield put(registerError());
    }
}
