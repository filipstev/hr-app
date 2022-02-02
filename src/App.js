import './App.css';
import JoinRoutes from './routes/JoinRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import * as userActions from './store/actions/user';
import axiosInstance from './helpers/axiosInstance';
import UserRoutes from './routes/UserRoutes';

function App() {
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userRole = useSelector((state) => state.user.role);

    const checkJwtValid = (exp) => {
        if (Date.now() >= exp * 1000) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        let decoded;
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            decoded = jwtDecode(user.jwt);
            if (checkJwtValid(decoded.exp)) {
                console.log('valid!');

                dispatch(userActions.setUser(user));
            } else {
                console.log('Not valid!');
            }
        } else {
            console.log('No user');
        }
    }, []);

    return (
        <div className="App">
            {!isLoggedIn ? (
                <JoinRoutes />
            ) : isLoggedIn && userRole === 'company_admin' ? (
                <AdminRoutes role={userRole} />
            ) : isLoggedIn && userRole === 'company_user' ? (
                <UserRoutes role={userRole} />
            ) : (
                <div>loading...</div>
            )}
        </div>
    );
}

export default App;
