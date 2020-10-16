import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  DayView,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DateNavigator,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { 
  Add as AddIcon, 
  Search, 
  Close
} from '@material-ui/icons';
import {
  FormControl,
  InputLabel, 
  Dialog, 
  TextField, 
  Select, 
  CardHeader, 
  Container, 
  Button, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Fab, 
  IconButton,
  MenuItem
} from '@material-ui/core';
import { connectProps } from '@devexpress/dx-react-core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Page from 'src/components/Page';
import api from '../../../utils/api';
import { appointments } from './data-demo/appointments';

const containerStyles = theme => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: 'right',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
});

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
      listTipoConsulta: []
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
    api.get('/tipoConsulta').then(response =>  this.setState({ listTipoConsulta: response.data }));
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
    console.log(this.state.appointmentChanges);
  }

  render() {
    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
    } = this.props;
    const { appointmentChanges, listTipoConsulta } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

    const textEditorProps = field => ({
      variant: 'outlined',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
      value: displayAppointmentData[field] || '',
      label: field[0],
      name: field[1],
      className: classes.textField,
    });

    const pickerEditorProps = field => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: date => this.changeAppointment({
        field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
      inputVariant: 'outlined',
      format: 'DD/MM/YYYY HH:mm',
      onError: () => null,
    });

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };

    return (
      <AppointmentForm.Overlay visible={visible} target={target} fullSize onHide={onHide}>
        <div>
          <div className={classes.header}>
            <IconButton className={classes.closeButton} onClick={cancelChanges}>
              <Close color="action" />
            </IconButton>
            <CardHeader title="Dados da Consulta" />            
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="tipoConsultaId">Tipo de Especialidade</InputLabel>
                <Select labelId="tipoConsultaId" {...textEditorProps(['Tipo Consulta', 'tipoConsultaId'])}>
                    {listTipoConsulta.map(item => <MenuItem value={item.id}>{item.descricao}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
            <div className={classes.wrapper}>
              <TextField
                {...textEditorProps(['C.P.F.', 'cpf'])}
              /> &nbsp;{' '}&nbsp;
              <Search className={classes.icon} color="action" onClick={()=> alert('Busca a porra do paciente')}/>
            </div>
            <div className={classes.wrapper}>
              <TextField {...textEditorProps(['Paciente', 'paciente'])}/>
            </div>
            <div className={classes.wrapper}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker label="Data Início" {...pickerEditorProps('startDate')} />
                <KeyboardDateTimePicker label="Data Fim" {...pickerEditorProps('endDate')} />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.wrapper}>
              <TextField {...textEditorProps(['Telefone', 'telefone'])} />
            </div>
            <div className={classes.wrapper}>
              <TextField {...textEditorProps(['Observação', 'observacao'])} multiline rows="6"/>
            </div>
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment('deleted');
                }}
              >
                Excluir
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
            >
              {isNewAppointment ? 'Novo' : 'Salvar'}
            </Button>
          </div>
        </div>
      </AppointmentForm.Overlay>
    );
  }
}

const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic);

const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});

/* eslint-disable-next-line react/no-multi-comp */
class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: '2018-06-27',
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 9,
      endDayHour: 19,
      isNewAppointment: false,
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment = data
        .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
        || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }

  componentDidUpdate() {
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;
    const { classes } = this.props;

    return (
      <Page className={classes.root} title="Agenda Médica">
        <br /><br /><br />
        <Container maxWidth="xl">
          <Paper>
            <Scheduler
              data={data}
            >
              <ViewState
                currentDate={currentDate}
                defaultCurrentViewName="Week"
                onCurrentDateChange={this.currentDateChange}
              />
              <EditingState
                onCommitChanges={this.commitChanges}
                onEditingAppointmentChange={this.onEditingAppointmentChange}
                onAddedAppointmentChange={this.onAddedAppointmentChange}
              />
              <DayView displayName="Dia" />
              <WeekView displayName="Semana"
                startDayHour={startDayHour}
                endDayHour={endDayHour}
              />
              <MonthView displayName="Mês" />
              <Toolbar />
              <DateNavigator />
              <TodayButton />
              <EditRecurrenceMenu />              
              <Appointments />
              <AppointmentTooltip
                showOpenButton
                showCloseButton
                showDeleteButton
              />
              
              <ViewSwitcher />
              <AppointmentForm
                overlayComponent={this.appointmentForm}
                visible={editingFormVisible}
                onVisibilityChange={this.toggleEditingFormVisibility}
              />
            </Scheduler>
    
            <Dialog open={confirmationVisible} onClose={this.cancelDelete}>
              <DialogTitle>
                Deletar uma consulta
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Tem certeza que deseja deletar essa consulta?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
                  Cancelar
                </Button>
                <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
                  Deletar
                </Button>
              </DialogActions>
            </Dialog>
    
            <Fab
              color="secondary"
              className={classes.addButton}
              onClick={() => {
                this.setState({ editingFormVisible: true });
                this.onEditingAppointmentChange(undefined);
                this.onAddedAppointmentChange({
                  startDate: new Date(currentDate).setHours(startDayHour),
                  endDate: new Date(currentDate).setHours(startDayHour + 1),
                });
              }}
            >
              <AddIcon />
            </Fab>
          </Paper>
        </Container>
        <br /><br /><br />
      </Page>
    );
  }
}

export default withStyles(styles, { name: 'AgendaMedica' })(Calendar);
