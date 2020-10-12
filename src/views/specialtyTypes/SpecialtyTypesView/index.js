import React, { useState , useEffect, useRef} from 'react';
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

const SpecialtyType = () => {
  const classes = useStyles();
  const [specialtyTypes, setSpecialtyTypes] = useState([{}]);
  const childRef = useRef();

  useEffect(() => {
    getTipoEspecialidade();
  }, []);

  const getTipoEspecialidade = async() => {
    const response = await api.get('/tipoEspecialidade');
    setSpecialtyTypes(response.data);
  }

  const onResetForm = () => {
    childRef.current.handleResetForm();
  }

  const OnEdit = (values) => {
    childRef.current.handleSetValues(values);
  }

  return (
    <Page className={classes.root} title="Tipo de Especialidade">
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="flex-end" >
          <Button color="primary" variant="contained" onClick={onResetForm}>Adicionar Tipo</Button>
        </Box>
        <br></br>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} xs={12}>
            <Results specialtyTypes={specialtyTypes} onEdit={OnEdit} getTipoEspecialidade={getTipoEspecialidade}/>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <ProfileDetails ref={childRef} getTipoEspecialidade={getTipoEspecialidade} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default SpecialtyType;
