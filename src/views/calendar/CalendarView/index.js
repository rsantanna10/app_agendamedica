import React,  {render, useState} from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import  Page  from 'src/components/Page';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import Modal from '@material-ui/core/Modal';
//import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const handleDateClick = (arg) => { // bind with an arrow function
  alert(arg.dateStr)
}


const data =   [
  {
    "title": "Event 1",
    "start": "2020-10-14T09:00:00",
    "end": "2020-10-14T10:00:00"
  },
  {
    "title": "Event 2",
    "start": "2020-10-14T10:00:00",
    "end": "2020-10-14T11:00:00"
  }];

const renderEventContent = (eventInfo) => {  
  return (
    <>
      <b>{eventInfo.title}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

const Calendar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

    return (
      <Page className={classes.root} title="Agenda Médica">
        <Container maxWidth="xl">
          <FullCalendar
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            plugins={[ dayGridPlugin, timeGridPlugin ]}
            initialView="timeGridWeek"
            events={data}
          />
        </Container>
       </Page>
    );

  

}

export default Calendar;