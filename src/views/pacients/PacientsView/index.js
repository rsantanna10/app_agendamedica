import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import jwt_decode from "jwt-decode";
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
  const usuario = jwt_decode(localStorage.getItem('app_token'));

  useEffect(() => {
    getPacientes();
  }, []);

  const getPacientes = async() => {
    const response = await api.get(`/paciente/user/${usuario.id}`);
    setPacients(response.data);
  }

  const onResetForm = () => {
    childRef.current.handleResetForm();
  }

  const OnEdit = (values) => {
    values.dataNascimento = values.dataNascimento.substring(0, 10);
    childRef.current.handleSetValues(values);
  }

  return (
    <Page className={classes.root} title="Pacientes">
      <Container maxWidth="xl">
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
