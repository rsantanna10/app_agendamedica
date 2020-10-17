import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
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
import jwt_decode from "jwt-decode";
import api from '../../../utils/api';
import MessageDiaglog from '../../../components/MessageDialog';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = forwardRef(({ className, getPacientes, ...rest }, ref) => {
  const usuario = jwt_decode(localStorage.getItem('app_token'));
  const pacienteDefault = { 
    usuarioId: usuario.id,
    nome: '',
    cpf: '',
    dataNascimento: null,
    sexo: null,
    email: null,
    telefone: ''
  };
  
  const classes = useStyles();
  const [values, setValues] = useState(pacienteDefault);
  const childRef = useRef();  

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async () => {
    
    if(values.id === undefined) { 
      await api.post('/paciente', values);
      childRef.current.handleOpenMessage('Paciente cadastrado com sucesso!', 'success');
    } else {
      await api.patch('/paciente/' + values.id, values);
      childRef.current.handleOpenMessage('Paciente atualizado com sucesso!', 'success');
    }
    getPacientes();
    setValues(pacienteDefault);
  }
  
  useImperativeHandle(ref, () => ({

    handleResetForm() {
      setValues(pacienteDefault);
    },
    handleSetValues(values) {
      setValues({
        ...values,
      });
    }

  }));

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
              <TextField fullWidth label="CPF" name="cpf" onChange={handleChange} required value={values.cpf} variant="outlined" />
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Nome" name="nome" onChange={handleChange} required value={values.nome} variant="outlined" />
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Birthday" 
                name="dataNascimento"
                type="date" 
                onChange={handleChange} 
                required 
                value={values.dataNascimento} 
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
              <RadioGroup aria-label="Sexo" name="sexo" value={values.sexo} onChange={handleChange}>
                <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                <FormControlLabel value="F" control={<Radio />} label="Feminino" />
              </RadioGroup>
            </FormControl>
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="E-mail" name="email" value={values.email} onChange={handleChange} required  variant="outlined" />
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Celular" name="telefone" value={values.telefone} onChange={handleChange}  required variant="outlined" />
            </Grid>            
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2} >
          <Button color="primary" variant="contained" onClick={onSubmit}>Gravar</Button>
        </Box>
      </Card>
      <MessageDiaglog ref={childRef} />
    </form>
  );
});

ProfileDetails.propTypes = {
  className: PropTypes.string,
  getPacientes: PropTypes.func
};

export default ProfileDetails;
