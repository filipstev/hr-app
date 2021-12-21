import {
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" style={{ marginTop: "82px" }}>
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
          <TextField label="Name" variant="outlined" fullWidth="true" />
        </Grid>
        <Grid item style={{ width: "100%" }}>
          <TextField label="Email" variant="outlined" fullWidth="true" />
        </Grid>
        <Grid item style={{ width: "100%" }}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth="true"
          />
        </Grid>
        <Grid item style={{ width: "100%" }}>
          <TextField label="Upload file" variant="outlined" fullWidth="true" />
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
              onClick={() => navigate("/login")}
            >
              Already have an account?
            </Link>
          </Grid>
          <Grid item>
            <Button variant="outlined">Register</Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
