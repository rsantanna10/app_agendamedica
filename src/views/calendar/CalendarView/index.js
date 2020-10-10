import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Container,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';

import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  EditRecurrenceMenu,
  ConfirmationDialog,
  AppointmentTooltip,
  AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const Calendar = () => {
  const classes = useStyles();
  const [data, setData] = useState(appointments);
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState({});

  const changeAddedAppointment = (a) => {
    setAddedAppointment({ a });
  }
  
  const changeAppointmentChanges = (a) => {
    setAppointmentChanges({ a });
  }
  
  const changeEditingAppointment = (e) => {
    setEditingAppointment({ e });
  }
  
  const commitChanges = ({ added, changed, deleted }) => {
    //this.setState((state) => {
      let  dataNew  = data;
      if (added) {
        const startingAddedId = dataNew.length > 0 ? dataNew[dataNew.length - 1].id + 1 : 0;
        dataNew = [...dataNew, { id: startingAddedId, ...added }];
      }
      if (changed) {
        dataNew = dataNew.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        dataNew = dataNew.filter(appointment => appointment.id !== deleted);
        alert('deletado');
      }
      setData({ dataNew });
    //});
  }

    return (
      <Page className={classes.root} title="Agenda">
        <Container maxWidth="lg">
          <Paper>
            <Scheduler data={data} locale="pt-BR">
              <ViewState defaultCurrentDate="2018-07-27"/>
              <EditingState
                onCommitChanges={commitChanges}        
                addedAppointment={addedAppointment}
                onAddedAppointmentChange={changeAddedAppointment}
                appointmentChanges={appointmentChanges}
                onAppointmentChangesChange={changeAppointmentChanges}
                editingAppointment={editingAppointment}
                onEditingAppointmentChange={changeEditingAppointment}
              />
              <MonthView />
              <Toolbar />
              <DateNavigator />
              <TodayButton />
              <EditRecurrenceMenu />
              <ConfirmationDialog />
              <Appointments />
              <AppointmentTooltip showOpenButton  showDeleteButton />
              <AppointmentForm />
            </Scheduler>
          </Paper>
        </Container>
      </Page>
    );
};

export default Calendar;

