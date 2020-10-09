import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Notifications = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Dados da sua agenda"
          title="Configurações"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={12}
            >
               <Typography color="textPrimary" gutterBottom variant="h6">
               Horário de atendimento
              </Typography>
              <Box component="div" display="inline">
                <TextField md={6} label="Início" name="horaInicio" type="text" required variant="outlined" />
                {' '}
                <TextField md={6} label="Fim" name="horaFim" type="text" required variant="outlined" />
              </Box>
              <br />
              <Divider />
              <br/>
              <Typography color="textPrimary" gutterBottom variant="h6">
                Dias de atendimento
              </Typography>
              <Box component="div" display="inline">
                <FormControlLabel control={(<Checkbox defaultChecked />)} label="Domingo" />
                <FormControlLabel control={(<Checkbox defaultChecked />)} label="Segunda"/>
                <FormControlLabel control={<Checkbox />} label="Terça" />
                <FormControlLabel control={(<Checkbox defaultChecked />)} label="Quarta"/>
                <FormControlLabel control={(<Checkbox defaultChecked />)} label="Quinta"/>
                <FormControlLabel control={(<Checkbox defaultChecked />)} label="Sexta"/>
                <FormControlLabel control={(<Checkbox defaultChecked />)} label="Sábado"/>
              </Box>
              <br />
              <Typography color="textPrimary" gutterBottom variant="h6">Texto SMS Agendamento</Typography>
              <TextField placeholder="Máximo 150 caracteres" multiline rows={3} />
              <br />
              <Typography color="textPrimary" gutterBottom variant="h6">Texto SMS Reagendamento</Typography>
              <TextField placeholder="Máximo 150 caracteres" multiline rows={3} />
              <br />
              <Typography color="textPrimary" gutterBottom variant="h6">Texto SMS Cancelamento</Typography>
              <TextField placeholder="Máximo 150 caracteres" multiline rows={3} />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">Salvar</Button>
        </Box>
      </Card>
    </form>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
