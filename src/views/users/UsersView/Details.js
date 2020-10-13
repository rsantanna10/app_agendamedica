import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
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
  Checkbox,  
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import api from '../../../utils/api';
import MessageDiaglog from '../../../components/MessageDialog';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Details = forwardRef(({ className, getUsers, ...rest }, ref) => {
  const userDefault = {
    tipoEspecialidadeId: null,
    tipoUsuario: null,
    nome: '',
    login: '',
    senha: '',
    ativo: false
  };
  
  const classes = useStyles();
  const [values, setValues] = useState(userDefault);
  const [specialtyTypes, setSpecialtyTypes] = useState([]);
  const [tipoUsuarios] = useState([ {id: 'A', descricao: 'Administrador'},{ id: 'U', descricao: 'Usuário' }]);
  const childRef = useRef(); 

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async () => {
    
    if(values.id === undefined) { 
      await api.post('/usuario', values);
      childRef.current.handleOpenMessage('Usuário cadastrado com sucesso!', 'success');
    } else {
      await api.patch('/usuario/' + values.id, values);
      childRef.current.handleOpenMessage('Usuário atualizado com sucesso!', 'success');
    }
    getUsers();
    setValues(userDefault);
  }
  
  useImperativeHandle(ref, () => ({

    handleResetForm() {
      setValues(userDefault);
    },
    handleSetValues(values) {
      setValues({
        ...values,
      });
    }

  }));

  useEffect(() => {
    getTipoEspecialidade();
  }, []);

  const getTipoEspecialidade = async() => {
    const response = await api.get('/tipoEspecialidade');
    setSpecialtyTypes(response.data);
  }

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
              <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="tipoUsuario" shrink={true}>Tipo Usuário</InputLabel>
                  <Select 
                  name="tipoUsuario"
                  onChange={handleChange}
                  value={values.tipoUsuario}>
                    {tipoUsuarios.map(item => <MenuItem value={item.id}>{item.descricao}</MenuItem>)}
                  </Select>
                </FormControl>
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="tipoEspecialidadeId" shrink={true}>Tipo de Especialidade</InputLabel>
                  <Select 
                  aria-expanded={true}
                  iconOutlined
                  name="tipoEspecialidadeId"
                  onChange={handleChange}
                  value={values.tipoEspecialidadeId}>
                    {specialtyTypes.map(item => <MenuItem value={item.id}>{item.descricao}</MenuItem>)}
                  </Select>
                </FormControl>
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Nome" name="nome" onChange={handleChange} required value={values.nome} variant="outlined" />
            </Grid>            
          </Grid>          
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Login" name="login" onChange={handleChange} required value={values.login} variant="outlined" />
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Senha" name="senha" type="password" onChange={handleChange} required value={values.senha}  variant="outlined" />
            </Grid>            
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <FormControlLabel name="ativo" control={( 
                <Checkbox defaultChecked={values.ativo}  checked={values.ativo} onChange={e => { setValues({...values, ativo: e.target.checked })}} /> )} label="Ativo" />
            </Grid>            
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={onSubmit}>Gravar</Button>
        </Box>
      </Card>
      <MessageDiaglog ref={childRef} />
    </form>
  );
});

Details.propTypes = {
  className: PropTypes.string,
  getUsers: PropTypes.func
};

export default Details;
