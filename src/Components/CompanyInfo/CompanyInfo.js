import {
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import Header from '../Header/Header';

const CompanyInfo = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm" style={{ marginTop: '82px' }}>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="flex-end"
          textAlign="left"
          fullWidth="true"
        >
          <Grid item style={{ width: '100%' }}>
            <Typography align="left">Company Info</Typography>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <TextField
              label="Company Name"
              variant="outlined"
              fullWidth="true"
            />
          </Grid>
          {/* TODO: DODATI UPLOAD INPUT UMESTO OVOG */}
          <Grid item style={{ width: '100%' }}>
            <TextField
              label="Company Logo"
              variant="outlined"
              fullWidth="true"
            />
          </Grid>
          <Button variant="outlined" color="black" style={{ margin: '0 8px' }}>
            SAVE
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default CompanyInfo;
