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

const Results = ({ className, consultationStatus, onEdit, getSituacaoConsulta, ...rest }) => {
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
    await api.delete('/situacaoConsulta/' + id);
    childRef.current.handleOpenMessage('Situação da Consulta deletada com sucesso!', 'success');
    getSituacaoConsulta();
  }

  const handlerSearch = () => {
    if(descricao !== '')
      consultationStatus = consultationStatus.filter(x => x.descricao === descricao);
  }

  return (
    <>
    <Card className={clsx(classes.root, className)} {...rest} >
      <CardHeader title="Lista de Situação de Consulta" />
      <Divider />
      <PerfectScrollbar>
        <Box display="flex" justifyContent="flex-end" >
          <div className={classes.wrapper}>
            <TextField label="Descrição" name="descricao" onChange={setDescricao} />&nbsp;{' '}&nbsp;
            <Search className={classes.icon} color="action" onClick={handlerSearch}/>
          </div>          
        </Box>  
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descrição</TableCell>                
                <TableCell></TableCell>    
              </TableRow>
            </TableHead>
            <TableBody>
              {consultationStatus.slice(page * limit, page * limit + limit).map((consultation) => (
                <TableRow hover key={consultation.id} selected={selectedCustomerIds.indexOf(consultation.id) !== -1}>
                  <TableCell>{consultation.descricao}</TableCell>
                  <TableCell  align="right" width="30%">
                    <IconButton onClick={() => onEdit(consultation)}><EditIcon color="primary" /></IconButton>|
                    <IconButton onClick={() => handleDelete(consultation.id)}><DeleteIcon color="secondary"/></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </PerfectScrollbar>
      <TablePagination component="div"
        count={consultationStatus.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    <MessageDiaglog ref={childRef} />
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  consultationStatus: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  getSituacaoConsulta: PropTypes.func
};

export default Results;
