import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    nome: 'Renato Sant\'Anna',
    tipoEspecialidade: 'Dentista',
    login: 'renato.santanna',
    ativo: true
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader title="Cadastro de Usuário" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Nome" name="nome" onChange={handleChange} required value={values.nome} variant="outlined" />
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Tipo de Especialidade" name="tipoEspecialidade" onChange={handleChange} required value={values.tipoEspecialidade} variant="outlined" />
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Login" name="login" onChange={handleChange} required value={values.login} variant="outlined" />
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Senha" name="senha" type="password" onChange={handleChange}  variant="outlined" />
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <FormControlLabel control={( <Checkbox defaultChecked={values.ativo}  /> )} label="Ativo" />
            </Grid>            
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2} >
          <Button color="primary" variant="contained">Gravar</Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
