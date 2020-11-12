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
import { Delete as DeleteIcon, Edit as EditIcon, Search, Archive } from '@material-ui/icons';
import MessageDiaglog from '../../../components/MessageDialog';
import api from '../../../utils/api';
import { CSVLink } from "react-csv";
import AlertDialog from '../../../components/AlertDialog';

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

const Results = ({ onEdit, className, consultationTypes, getTipoConsulta, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const childRef = useRef();
  const chilRefAlert = useRef();
  const [descricao, setDescricao] = useState('');
  const [consultationTypeId, setConsultationTypeId] = useState(0);

  const headers = [
    { label: "Descrição", key: "descricao" },
    { label: "Cor", key: "cor" },
  ];

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleConfirm = async (id) => {
    setConsultationTypeId(id);
    chilRefAlert.current.handleClickOpen();
  };

  const handleDelete = async (id) => {
    await api.delete('/tipoConsulta/' + id);
    childRef.current.handleOpenMessage('Tipo de Consulta deletada com sucesso!', 'success');
    getTipoConsulta();
  };

  const handlerSearch = () => {
    if(descricao !== '')
      consultationTypes = consultationTypes.filter(x => x.descricao === descricao);
  };

  return (
    <>
    <Card className={clsx(classes.root, className)} {...rest} >
      <CardHeader title="Lista de Tipo de Consulta" />
      <Divider />
      <PerfectScrollbar>
        <Box display="flex" justifyContent="flex-end" >
          <div className={classes.wrapper}>
            <TextField label="Descrição" name="descricao" onChange={setDescricao} />&nbsp;{' '}&nbsp;
            <Search className={classes.icon} color="action" onClick={handlerSearch}/>{' '}
            <CSVLink className={classes.icon} color="action" data={consultationTypes} headers={headers} separator={";"}><Archive/></CSVLink>
          </div>          
        </Box>  
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descrição</TableCell>             
                <TableCell>Cor</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consultationTypes.slice(page * limit, page * limit + limit).map((consultationType) => (
                <TableRow hover key={consultationType.id} selected={selectedCustomerIds.indexOf(consultationType.id) !== -1}>
                  <TableCell>{consultationType.descricao}</TableCell>
                  <TableCell>{consultationType.cor}</TableCell>
                  <TableCell  align="right" width="30%">
                    <IconButton onClick={() => onEdit(consultationType)}><EditIcon color="primary" /></IconButton>|
                    <IconButton 
                      onClick={() => handleConfirm(consultationType.id)} >
                        <DeleteIcon color="secondary"/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </PerfectScrollbar>
      <TablePagination component="div"
        count={consultationTypes.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    <MessageDiaglog ref={childRef} />
    <AlertDialog ref={chilRefAlert} handleConfirm={() => handleDelete(consultationTypeId)} />
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  consultationTypes: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  getTipoConsulta: PropTypes.func
};

export default Results;
