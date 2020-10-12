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
import ProfileDetails from './Details';
import api from '../../../utils/api';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ConsultationStatus = () => {
  const classes = useStyles();
  const [consultationStatus,setConsultationStatus] = useState([]);
  const childRef = useRef();

  useEffect(() => {
    getSituacaoConsulta();
  }, []);

  const getSituacaoConsulta = async() => {
    const response = await api.get('/situacaoConsulta');
    setConsultationStatus(response.data);
  }

  const onResetForm = () => {
    childRef.current.handleResetForm();
  }

  const OnEdit = (values) => {
    childRef.current.handleSetValues(values);
  }

  return (
    <Page className={classes.root} title="Situação da Consulta">
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="flex-end" >
          <Button color="primary" variant="contained" onClick={onResetForm}>Adicionar Situação</Button>
        </Box>
        <br></br>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} xs={12}>
            <Results consultationStatus={consultationStatus} onEdit={OnEdit} getSituacaoConsulta={getSituacaoConsulta}  />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <ProfileDetails ref={childRef} getSituacaoConsulta={getSituacaoConsulta} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ConsultationStatus;
