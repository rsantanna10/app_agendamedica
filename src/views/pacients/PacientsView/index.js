import React, { useState, useEffect, useRef } from 'react';
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
import api from '../../../utils/api';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const Paciente = () => {
  const classes = useStyles();
  const [pacients, setPacients] = useState([]);
  const childRef = useRef();

  useEffect(() => {
    getPacientes();
  }, []);

  const getPacientes = async() => {
    const response = await api.get('/paciente/user/1');
    setPacients(response.data);
  }

  const onResetForm = () => {
    childRef.current.handleResetForm();
  }

  const OnEdit = (values) => {
    childRef.current.handleSetValues(values);
  }

  return (
    <Page className={classes.root} title="Pacientes">
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="flex-end">
          <Button color="primary" variant="contained" onClick={onResetForm}>Adicionar Paciente</Button>
        </Box>
        <br></br>
        <Grid container spacing={3}>
          <Grid item lg={7} md={7} xs={12}>
            <Results pacients={pacients} onEdit={OnEdit} getPacientes={getPacientes} />
          </Grid>
          <Grid item lg={5} md={5} xs={12}>
            <Details ref={childRef} getPacientes={getPacientes} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Paciente;
