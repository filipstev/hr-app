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

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import UploadButton from '../Buttons/UploadButton';
import SelectCompany from './SelectCompanyInput';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { slug } = useParams();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [userRole, setUserRole] = useState('company_user');
    const registerError = useSelector((state) => state.register.isError);
    console.log(isLoggedIn);
    const [image, setImage] = useState('');

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

    const handleRegisterImageUpload = (e) => {
        setImage(e.target.files);
    };

    const handleRegistration = (img) => {
        if (enteredPassword !== '') {
            dispatch(
                registerUser.registerUser(
                    enteredName,
                    enteredEmail,
                    enteredPassword,
                    userRole,
                    companyId,
                    img,
                    navigate
                )
            );
        }

        // navigate(`/`);
    };
    const onSubmit = async () => {
        if (enteredPassword === '') {
            // setIsError(true);
            return;
        }
        const img = new FormData();
        if (image) {
            img.append('files', image[0]);
        }
        handleRegistration(img);
    };
    useEffect(() => {
        isLoggedIn && navigate(`/`);
    }, [isLoggedIn, navigate]);
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
                <SelectCompany
                    companies={companies}
                    company={company}
                    setCompany={setCompany}
                    setCompanyId={setCompanyId}
                />
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

                <Grid
                    item
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="company_user"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            value="company_admin"
                            control={<Radio />}
                            label="Admin"
                            onInput={() => {
                                setUserRole('company_admin');
                            }}
                        />
                        <FormControlLabel
                            value="company_user"
                            control={<Radio />}
                            label="User"
                            onInput={() => setUserRole('company_user')}
                        />
                    </RadioGroup>
                </Grid>

                <Grid item>
                    <UploadButton
                        onUpload={handleRegisterImageUpload}
                        id={'register'}
                    />
                    {image && (
                        <img
                            style={{ height: '150px', width: '150px' }}
                            src={URL.createObjectURL(image[0])}
                            alt="profile"
                        />
                    )}
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
