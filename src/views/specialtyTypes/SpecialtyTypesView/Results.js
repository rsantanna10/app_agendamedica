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

const Results = ({ onEdit, className, specialtyTypes, getTipoEspecialidade, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const childRef = useRef();
  const chilRefAlert = useRef();
  const [descricao, setDescricao] = useState('');
  const [specialtyTypeId, setSpecialtyTypeId] = useState(0);

  const headers = [
    { label: "Descrição", key: "descricao" }
  ];

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleConfirm = async (id) => {
    setSpecialtyTypeId(id);
    chilRefAlert.current.handleClickOpen();
  };

  const handleDelete = async (id) => {
    await api.delete('/tipoEspecialidade/' + id);
    childRef.current.handleOpenMessage('Tipo de Especialidade deletado com sucesso!', 'success');
    getTipoEspecialidade();
  };

  const handlerSearch = () => {
    if(descricao !== '')
      specialtyTypes = specialtyTypes.filter(x => x.descricao === descricao);
  };

  return (
    <>
    <Card className={clsx(classes.root, className)} {...rest} >
      <CardHeader title="Lista de Tipo de Especialidade" />
      <Divider />
      <PerfectScrollbar>
        <Box display="flex" justifyContent="flex-end" >
          <div className={classes.wrapper}>
            <TextField label="Descrição" name="descricao" onChange={setDescricao} />&nbsp;{' '}&nbsp;
            <Search className={classes.icon} color="action" onClick={handlerSearch}/>{' '}
            <CSVLink className={classes.icon} color="action" data={specialtyTypes} headers={headers} separator={";"}><Archive/></CSVLink>
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
              {specialtyTypes.slice(page * limit, page * limit + limit).map((specialtyType) => (
                <TableRow hover key={specialtyType.id} selected={selectedCustomerIds.indexOf(specialtyType.id) !== -1}>
                  <TableCell>{specialtyType.descricao}</TableCell>
                  <TableCell  align="right" width="30%">
                    <IconButton onClick={() => onEdit(specialtyType)}><EditIcon color="primary" /></IconButton>|
                    <IconButton 
                      onClick={() => handleConfirm(specialtyType.id)} >
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
        count={specialtyTypes.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    <MessageDiaglog ref={childRef} />
    <AlertDialog ref={chilRefAlert} handleConfirm={() => handleDelete(specialtyTypeId)} />
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  specialtyTypes: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  getTipoEspecialidade: PropTypes.func
};

export default Results;
