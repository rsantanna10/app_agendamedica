import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import Page from 'src/components/Page';
import api from '../../utils/api';
import MessageDiaglog from '../../components/MessageDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
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

   const onSubmit = async (values) => {
    
     await api.post('/usuario', values).then( async resp => {
      childRef.current.handleOpenMessage('Usuário cadastro com sucesso!', 'success');
     }).catch((error) => {
      childRef.current.handleOpenMessage(error.response.data, 'error');
     });
   }

  return (
    <Page className={classes.root} title="Registrar Usuário">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              login: '',
              tipoEspecialidadeId: '',
              nome: '',
              senha: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                tipoEspecialidadeId: Yup.string().max(255).required('Tipo de Especialidade é um campo obrigatório'),
                nome: Yup.string().max(255).required('Nome é um campo obrigatório'),
                login: Yup.string().email('O e-mail deve ser válido').max(255).required('Email é um campo obrigatório'),
                senha: Yup.string().max(255).required('Senha é um campo obrigatório'),
                policy: Yup.boolean().oneOf([true], 'Esse campo precisa ser marcado')
              })
            }
            onSubmit={(values, {resetForm}) => {              
              const params = {
                tipoEspecialidadeId: values.tipoEspecialidadeId,
                tipoUsuario: 'U',
                nome: values.nome,
                login: values.login,
                senha: values.senha,
                ativo: true
              };

              onSubmit(params);
              resetForm({ values: ''});
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Criar nova conta
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use seu e-mail para criar uma nova conta
                  </Typography>
                </Box>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="tipoEspecialidade">Tipo de Especialidade</InputLabel>
                  <Select 
                  name="tipoEspecialidadeId" 
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tipoEspecialidadeId}
                  error={Boolean(touched.tipoEspecialidadeId && errors.tipoEspecialidadeId)}                  
                  helperText={touched.tipoEspecialidadeId && errors.tipoEspecialidadeId}>
                    {specialtyTypes.map(item => <MenuItem value={item.id}>{item.descricao}</MenuItem>)}
                  </Select>
                </FormControl>
                <TextField
                  error={Boolean(touched.nome && errors.nome)}
                  fullWidth
                  helperText={touched.nome && errors.nome}
                  label="Nome"
                  margin="normal"
                  name="nome"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nome}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.login && errors.login)}
                  fullWidth
                  helperText={touched.login && errors.login}
                  label="E-mail"
                  margin="normal"
                  name="login"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.login}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.senha && errors.senha)}
                  fullWidth
                  helperText={touched.senha && errors.senha}
                  label="Senha"
                  margin="normal"
                  name="senha"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.senha}
                  variant="outlined"
                />
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Eu li os 
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Termos e Condições
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Cadastra-se agora
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Ter uma conta?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Entre
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
      <MessageDiaglog ref={childRef} />
    </Page>
  );
};

export default RegisterView;
