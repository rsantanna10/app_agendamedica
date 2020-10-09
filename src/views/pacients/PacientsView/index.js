import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Details from './Details';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SpecialtyType = () => {
  const classes = useStyles();
  const [users] = useState(data);

  return (
    <Page className={classes.root} title="Pacientes">
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="flex-end">
          <Button color="primary" variant="contained">Adicionar Paciente</Button>
        </Box>
        <br></br>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} xs={12}>
            <Results users={users} />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <Details />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default SpecialtyType;
