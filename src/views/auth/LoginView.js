import React, { useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
//import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import api  from '../../utils/api';
import MessageDiaglog from '../../components/MessageDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const childRef = useRef();

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'admin@admin.com',
              senha: '123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              senha: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values) => {
              let jwt = null;
              await api.post(`http://localhost:3001/login`, `{"login":"${values.email}", "senha":"${values.senha}"}`,
                  {
                    headers: { 'Content-Type': 'application/json' },
                    observe: 'response',
                  },
                )
                .then((response) => {
                  jwt = response.data.token;
                  localStorage.setItem('app_token', jwt);
                })
                .catch((error) => {
                    childRef.current.handleOpenMessage('Usuário ou senha inválido(s)', 'error');
                });
          
              if (jwt) {
                navigate('/app/dashboard', { replace: true });
              }              
              
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
                  <Typography color="textPrimary" variant="h2">
                    Agenda Médica
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Faça  login com
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  {/* <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login com Facebook
                    </Button>
                  </Grid> */}
                  <Grid
                    item
                    xs={12}
                    md={12}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login com Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  mt={3}
                  mb={1}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Ou faça login com endereço de e-mail
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="E-mail"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.senha && errors.senha)}
                  fullWidth
                  helperText={touched.senha && errors.senha}
                  label="Senha"
                  margin="normal"
                  name="senha"
                  onChange={handleChange}
                  type="password"
                  value={values.senha}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1" > Não tem uma conta?{' '}
                  <Link component={RouterLink} to="/register" variant="h6" >
                    Crie agora!
                  </Link>
                </Typography>
                <Typography color="textSecondary" variant="body1" >
                  Esqueceu sua senha?
                  <Link component={RouterLink} to="/forgot" variant="h6" >
                    Clique aqui!
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

export default LoginView;
