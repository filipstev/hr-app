import {
    Container,
    Grid,
    Link,
    TextField,
    Typography,
    Button,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as userActions from '../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Login.module.css';
import Spinner from '../Spinner.js/Spinner';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);

    const loginError = useSelector((state) => state.user.isError);
    const isLoading = useSelector((state) => state.user.isLoading);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsError(false);
        if (password === '' || !validateEmail(email) || password.length < 6) {
            setIsError(true);
            return;
        }
        if (password !== '' && validateEmail(email)) {
            // const login = await dispatch(userActions.login(email, password));
            dispatch(userActions.signIn(email, password));
        }
    };

    if (isLoading) {
        return (
            <div className={classes.Spin}>
                <Spinner />
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    marginTop: '82px',
                    width: '40%',
                    marginRight: '0 !important',
                    marginLeft: '0 !important',
                }}
                className={classes.Login}
            >
                <form onSubmit={onSubmit}>
                    <Grid
                        container
                        spacing={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        textalign="left"
                        fullWidth
                    >
                        <Grid item style={{ width: '100%' }}>
                            <Typography align="left">uTeam - Login</Typography>
                        </Grid>

                        <Grid item style={{ width: '100%' }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={
                                    isError && !validateEmail(email)
                                        ? true
                                        : false
                                }
                            />
                        </Grid>
                        <Grid item style={{ width: '100%' }}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={
                                    isError &&
                                    (password === '' || password.length < 6)
                                        ? true
                                        : false
                                }
                            />
                        </Grid>
                        {loginError ? (
                            <div
                                style={{
                                    color: 'red',
                                    marginTop: '10px',
                                }}
                            >
                                Couldn't find your account
                            </div>
                        ) : null}
                        {isError ? (
                            <div
                                style={{
                                    color: 'red',
                                    marginTop: '10px',
                                    marginBottom: '12px',
                                }}
                            >
                                Password needs to have 6 characters
                            </div>
                        ) : null}
                        <Grid
                            container
                            spacing={3}
                            justifyContent="space-between"
                            alignItems="center"
                            style={{ width: '100%' }}
                        >
                            <Grid item>
                                <Link
                                    underline="hover"
                                    onClick={() => navigate('/join')}
                                    style={{
                                        cursor: 'pointer',
                                        color: 'black',
                                    }}
                                >
                                    Don't have an account?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    type="submit"
                                    onClick={onSubmit}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
};

export default Login;
