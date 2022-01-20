import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axiosInstance from '../../helpers/axiosInstance';
import useInput from '../../hooks/use-input';
import * as registerUser from '../../store/actions/register';

import {
    Container,
    Grid,
    Link,
    TextField,
    Typography,
    Button,
} from '@material-ui/core';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
// dodati user role, i kompaniju
const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { slug } = useParams();
    console.log(slug);
    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState('');
    const [companyId, setCompanyId] = useState('');

    const registerError = useSelector((state) => state.register.isError);
    const image = new FormData();

    const nameRegEx = /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/g;
    const emailRegEx =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    useEffect(() => {
        axiosInstance.get(`/companies`).then(({ data }) => {
            setCompanies(data.data);
            if (slug) {
                setCompany(slug);
                return;
            }
            setCompany(data.data[0].attributes.slug);
        });

        return () => {
            'cleanup';
        };
    }, [slug]);

    const {
        value: enteredName,
        hasError: nameInputHasError,
        isValid: enteredNameIsValid,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput,
    } = useInput((value) => nameRegEx.test(value));

    const {
        value: enteredEmail,
        hasError: emailInputHasError,
        isValid: enteredEmailIsValid,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput,
    } = useInput((value) => emailRegEx.test(value));

    const {
        value: enteredPassword,
        reset: resetPasswordInput,
        hasError: passwordInputHasError,
        isValid: enteredPasswordIsValid,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => +value.length > 5);

    const onSubmit = async () => {
        if (enteredPassword === '') {
            // setIsError(true);
            return;
        }
        if (enteredPassword !== '') {
            dispatch(
                registerUser.registerUser(
                    enteredName,
                    enteredEmail,
                    enteredPassword,
                    companyId,
                    image
                )
            );
        }
    };

    const selectCompany = () => {
        return (
            <>
                <FormControl
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '97%',
                    }}
                >
                    <InputLabel id="selectCompany">Company</InputLabel>
                    <Select
                        sx={{ paddingLeft: '16px', width: '100%' }}
                        labelId="selectCompany"
                        id="selectCompany"
                        label="Company"
                        value={company}
                        onChange={(e) => {
                            setCompany(e.target.value);
                            setCompanyId(
                                companies.filter(
                                    (company) =>
                                        company.attributes.slug ===
                                        e.target.value
                                )[0].id
                            );
                        }}
                    >
                        {companies.map((item) => {
                            return (
                                <MenuItem
                                    value={item.attributes.slug}
                                    key={item.id}
                                >
                                    {item.attributes.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </>
        );
    };

    return (
        <Container
            maxWidth="sm"
            style={{ marginTop: '82px' }}
            component="form"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
                resetNameInput();
                resetEmailInput();
                resetPasswordInput();
            }}
        >
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
                textAlign="left"
                fullWidth="true"
            >
                <Grid item style={{ width: '100%' }}>
                    <Typography align="left">uTeam - Register</Typography>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                    <TextField
                        error={nameInputHasError ? true : false}
                        label="Name"
                        variant="outlined"
                        fullWidth="true"
                        value={enteredName}
                        onInput={nameChangedHandler}
                        onBlur={nameBlurHandler}
                    />
                </Grid>

                <Grid item style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth="true"
                        error={emailInputHasError ? true : false}
                        value={enteredEmail}
                        onInput={emailChangedHandler}
                        onBlur={emailBlurHandler}
                    />
                </Grid>
                {selectCompany()}
                <Grid item style={{ width: '100%' }}>
                    <TextField
                        error={passwordInputHasError ? true : false}
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth="true"
                        value={enteredPassword}
                        onInput={passwordChangedHandler}
                        onBlur={passwordBlurHandler}
                    />
                </Grid>

                <Grid item style={{ width: '100%' }}>
                    <TextField
                        type="file"
                        label="Upload file"
                        variant="outlined"
                        fullWidth="true"
                        accept="image/*"
                        onInput={(e) => {
                            image.append('files', e.target.files[0]);
                        }}
                    />
                    <div id="img"></div>
                </Grid>
                <div>
                    {registerError && (
                        <div
                            style={{
                                color: 'red',
                                marginTop: '10px',
                            }}
                        >
                            That E-mail is alredy in use
                        </div>
                    )}
                </div>
                <Grid
                    container
                    spacing={3}
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ width: '100%' }}
                >
                    <Grid item>
                        <Link
                            variant="link"
                            underline="hover"
                            color="black"
                            onClick={() => navigate('/')}
                        >
                            Already have an account?
                        </Link>
                    </Grid>

                    <Grid item>
                        <Button
                            variant="outlined"
                            type="submit"
                            disabled={
                                enteredEmailIsValid &&
                                enteredNameIsValid &&
                                enteredPasswordIsValid
                                    ? false
                                    : true
                            }
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;
