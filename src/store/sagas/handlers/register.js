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
                    role: action.userRole,
                };

                localStorage.setItem('user', JSON.stringify(user));
                console.log(action.file);
                console.log('UserID: ', user.user.id);
                yield call(() => {
                    if (!action.file.entries('files').next().value) {
                        createNewProfile({
                            name: action.name,
                            id: user.user.id,
                            companyId: action.companyId,
                            userRole: action.userRole,
                        });
                    }
                    if (action.file.entries('files').next().value) {
                        uploadAndConnectImage(action.file).then((res) => {
                            createNewProfile({
                                name: action.name,
                                id: user.user.id,
                                companyId: action.companyId,
                                photoId: res.data[0].id,
                                userRole: action.userRole,
                            });
                        });
                    }
                });
                yield put(setUser(user));
            }
        }
    } catch (err) {
        console.log(err);
        yield put(registerError());
    }
}
