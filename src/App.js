import './App.css';
import JoinRoutes from './routes/JoinRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import * as userActions from './store/actions/user';
import UserRoutes from './routes/UserRoutes';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@mui/material';
import { DarkTheme, LightTheme } from './context/Themes';
import { ThemeContext } from './context/theme-context';

function App() {
    const { theme } = useContext(ThemeContext);

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
        <>
            <ThemeProvider theme={theme === 'light' ? LightTheme : DarkTheme}>
                {/* <ThemeProvider theme={DarkTheme}> */}
                {/* <ReactHelmet
                    link={[
                        {
                            rel: 'stylesheet',
                            type: 'text/css',
                            href:
                                theme === 'dark'
                                    ? '/.MuiOverride.css'
                                    : './MuiInitial.css',
                        },
                    ]}
                /> */}
                )
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
                    <ReactQueryDevtools />
                </div>
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            theme === 'dark'
                                ? `
                                .MuiInputBase-input {
                                    color: white !important;
                                }
                                
                                .MuiInputLabel-root {
                                    color: white !important;
                                }
                                
                                .MuiOutlinedInput-notchedOutline {
                                    border-color: white !important;
                                }
                                `
                                : `.MuiInputBase-input {
                                    color: black !important;
                                }
                                
                                .MuiInputLabel-root {
                                    color: black !important;
                                }
                                
                                .MuiOutlinedInput-notchedOutline {
                                    border-color: black !important;
                                }
                                `,
                    }}
                />
            </ThemeProvider>
        </>
    );
}

export default App;
