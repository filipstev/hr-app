import { useNavigate } from "react-router-dom";

import {
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Button,
  InputLabel,
} from "@material-ui/core";

import useInput from "../../hooks/use-input";
import ResponsiveDrawer from "../Menu/Menu";

const Register = () => {
  const navigate = useNavigate();

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
    value: passwordInputValue,
    reset: resetPasswordInput,
    isValid: eneteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.length > 5);
  console.log(eneteredPasswordIsValid);
  return (
    <Container
      maxWidth="sm"
      style={{ marginTop: "82px" }}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
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

          {nameInputHasError && (
            <Typography variant="body1" color="error">
              You call that a name ?
            </Typography>
          )}
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
          {emailInputHasError && (
            <Typography variant="body1" color="error">
              Funny error message here
            </Typography>
          )}
        </Grid>

        <Grid item style={{ width: "100%" }}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth="true"
            value={passwordInputValue}
            onInput={passwordChangedHandler}
            onBlur={passwordBlurHandler}
          />

          {passwordInputHasError && (
            <Typography variant="body1" color="error">
              Password is too bland, please add more spice to it
            </Typography>
          )}
        </Grid>

        <Grid item style={{ width: "100%" }}>
          <TextField
            type="file"
            label="Upload file"
            variant="outlined"
            fullWidth="true"
            accept="image/*"
            id="fileUpload"
          />

          {/* <InputLabel
            style={{
              display: "flex",
              border: "1px solid black",
              width: "200px",
              height: "100px",
              justifyContent: "right",
              alignItems: "center",
            }}
            forHtml="uploadImage"
          >
            <TextField
              style={{ display: "none" }}
              type="file"
              id="uploadImage"
              label="Upload file"
              variant="outlined"
              fullWidth="true"
              accept="image/*"
            />

            <button
              stypel={{}}
              onClick={() => document.getElementById("uploadImage").click()}
            >
              Choose File
            </button>
          </InputLabel> */}
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
