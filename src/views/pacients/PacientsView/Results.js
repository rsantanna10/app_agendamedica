import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  TextField,
  CardContent,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
  IconButton
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon, Search } from '@material-ui/icons';
import MessageDiaglog from '../../../components/MessageDialog';
import api from '../../../utils/api';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0)    
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
    cursor: 'pointer'
  }
}));

const Results = ({ className, pacients, onEdit, getPacientes, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const childRef = useRef();
  const [descricao, setDescricao] = useState('');

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (id) => {
    await api.delete('/paciente/' + id);
    childRef.current.handleOpenMessage('Paciente deletado com sucesso!', 'success');
    getPacientes();
  }

  const handlerSearch = () => {
    if(descricao !== '')
      pacients = pacients.filter(x => x.descricao === descricao);
  }

  return (
    <>
    <Card className={clsx(classes.root, className)} {...rest} >
      <CardHeader title="Lista de Pacientes" />
      <Divider />
      <PerfectScrollbar>
        <Box display="flex" justifyContent="flex-end" >
          <div className={classes.wrapper}>
            <TextField label="Nome" name="descricao" onChange={setDescricao} />&nbsp;{' '}&nbsp;
            <Search className={classes.icon} color="action" onClick={handlerSearch}/>
          </div>          
        </Box>  
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pacients.slice(page * limit, page * limit + limit).map((pacient) => (
                <TableRow hover key={pacient.id} selected={selectedCustomerIds.indexOf(pacient.id) !== -1}>
                  <TableCell>{pacient.nome}</TableCell>
                  <TableCell>{pacient.email}</TableCell>
                  <TableCell  align="right" width="30%">
                    <IconButton onClick={() => onEdit(pacient)}><EditIcon color="primary" /></IconButton>|
                    <IconButton onClick={() => handleDelete(pacient.id)}><DeleteIcon color="secondary"/></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </PerfectScrollbar>
      <TablePagination component="div"
        count={pacients.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]} />
    </Card>
    <MessageDiaglog ref={childRef} />
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  pacients: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  getSPacientes: PropTypes.func
};

export default Results;
