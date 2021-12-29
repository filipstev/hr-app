import { useNavigate } from "react-router-dom";

import {
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";

import useInput from "../../hooks/use-input";
import * as registerUser from '../../store/actions/register';
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  const nameRegEx = /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/g;
  const emailRegEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
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
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(() => true);
  console.log(`Name: ` + enteredName);
  console.log('Email: ' + enteredEmail);
  console.log('Password: ' + enteredPassword);
  const onSubmit = async () => {
    if (enteredPassword === '' ) {
      // setIsError(true);
      return;
    }
    if (enteredPassword !== '' ) {
      // const login = await dispatch(userActions.login(email, password));
      dispatch(registerUser.registerUser(enteredName, enteredEmail, enteredPassword));
    }
  };
  return (
    <Container
    maxWidth="sm"
      style={{ marginTop: "82px" }}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit()
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
        <Grid item style={{ width: "100%" }}>
          <Typography align="left">uTeam - Register</Typography>
        </Grid>
        <Grid item style={{ width: "100%" }}>
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

        <Grid item style={{ width: "100%" }}>
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

        <Grid item style={{ width: "100%" }}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth="true"
            value={enteredPassword}
            onInput={passwordChangedHandler}
            onBlur={passwordBlurHandler}
          />
        </Grid>

        <Grid item style={{ width: "100%" }}>
          <TextField
            type="file"
            label="Upload file"
            variant="outlined"
            fullWidth="true"
            accept="image/*"
          />
        </Grid>

        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          style={{ width: "100%" }}
        >
          <Grid item>
            <Link
              variant="link"
              underline="hover"
              color="black"
              onClick={() => navigate("/")}
            >
              Already have an account?
            </Link>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              type="submit"
              disabled={
                enteredEmailIsValid && enteredNameIsValid ? false : true
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
