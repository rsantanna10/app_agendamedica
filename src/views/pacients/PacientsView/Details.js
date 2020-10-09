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
  FormControl,
  FormLabel,
  RadioGroup,
  Radio
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({});

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
        <CardHeader title="Cadastro de Paciente" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="CPF" name="cpf" onChange={handleChange} required value={values.nome} variant="outlined" />
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Birthday" 
                name="dataNascimento"
                type="date" 
                onChange={handleChange} 
                required 
                value={values.tipoEspecialidade} 
                variant="outlined"  
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
            <FormControl component="fieldset">
              <FormLabel component="legend">Sexo</FormLabel>
              <RadioGroup aria-label="Sexo" name="sexo" value={''} onChange={handleChange}>
                <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                <FormControlLabel value="F" control={<Radio />} label="Feminino" />
              </RadioGroup>
            </FormControl>
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="E-mail" name="email" onChange={handleChange} required  variant="outlined" />
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Celular" name="celular" onChange={handleChange}  required variant="outlined" />
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
