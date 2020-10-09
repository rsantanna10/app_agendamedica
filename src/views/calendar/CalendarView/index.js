import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Container,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
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
  const [data] = useState(appointments);

    return (
      <Page className={classes.root} title="Agenda">
        <Container maxWidth="lg">
          <Paper>
            <Scheduler data={data} locale="pt-BR">
              <ViewState defaultCurrentDate="2018-07-27"/>
              <MonthView />
              <Toolbar />
              <DateNavigator />
              <TodayButton />
              <Appointments />
            </Scheduler>
          </Paper>
        </Container>
      </Page>
    );
};

export default Calendar;

