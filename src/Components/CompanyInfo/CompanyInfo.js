import {
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Button,
} from '@material-ui/core';
import React, { useState } from 'react';

const CompanyInfo = () => {
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
          <Typography align="left">Company Info</Typography>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <TextField label="Company Name" variant="outlined" fullWidth="true" />
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <TextField label="Company Logo" variant="outlined" fullWidth="true" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyInfo;
