import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import jwt_decode from "jwt-decode";
import api from '../../../utils/api';
import MessageDiaglog from '../../../components/MessageDialog';

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const defaultValues = {
    senha: '',
    confirmaSenha: ''
  };

  const usuario = jwt_decode(localStorage.getItem('app_token'));
  const classes = useStyles();
  const [values, setValues] = useState(defaultValues);
  const childRef = useRef();


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async () => {
    
    await api.post(`/usuario/senha/${usuario.id}`, { senha: values.senha});
    childRef.current.handleOpenMessage('Senha atualizada com sucesso!', 'success');
    setValues(defaultValues);
  }

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Atualizar Senha"
          title="Senha"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Senha"
            margin="normal"
            name="senha"
            onChange={handleChange}
            type="password"
            value={values.senha}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirmar senha"
            margin="normal"
            name="confirmaSenha"
            onChange={handleChange}
            type="password"
            value={values.confirmaSenha}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button color="primary" variant="contained" onClick={onSubmit}>Atualizar</Button>
        </Box>
      </Card>
      <MessageDiaglog ref={childRef} />
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
