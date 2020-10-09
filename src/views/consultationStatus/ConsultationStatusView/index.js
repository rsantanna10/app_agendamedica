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
import ProfileDetails from './Details';
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
  const [consultationStatus] = useState(data);

  return (
    <Page className={classes.root} title="Situação da Consulta">
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="flex-end" >
          <Button color="primary" variant="contained">Adicionar Situação</Button>
        </Box>
        <br></br>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} xs={12}>
            <Results consultationStatus={consultationStatus} />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default SpecialtyType;
