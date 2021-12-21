import {
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Button,
} from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onSubmit = () => {
    if (password === '' || !validateEmail(email) || password.length < 6) {
      setIsError(true);
      return;
    }
    if (password !== '' && validateEmail(email)) {
      console.log('Dalje');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '82px' }}>
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
          <Typography align="left">uTeam - Login</Typography>
        </Grid>

        <Grid item style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth="true"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={isError && !validateEmail(email) ? true : false}
          />
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={
              isError && (password === '' || password.length < 6) ? true : false
            }
          />
        </Grid>

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
              onClick={() => navigate('/register')}
            >
              Already have an account?
            </Link>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={onSubmit}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
