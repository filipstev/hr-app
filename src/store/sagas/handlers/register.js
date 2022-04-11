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

                yield call(() => {
                    if (!action.file.entries('files').next().value) {
                        createNewProfile({
                            name: action.name,
                            id: user.user.id,
                            companyId: action.companyId,
                            userRole: action.userRole,
                            navigate: action.navigate,
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
                                navigate: action.navigate,
                            });
                        });
                    }
                });
                action.setSpin(false);
                action.navigate(`/`);
                yield put(setUser(user));
            }
        }
    } catch (err) {
        console.log(err);
        action.setSpin(false);
        yield put(registerError());
    }
}
