import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
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
import {Delete as DeleteIcon, Edit as EditIcon} from '@material-ui/icons';
import MessageDiaglog from '../../../components/MessageDialog';
import api from '../../../utils/api';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ onEdit, className, specialtyTypes, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const childRef = useRef();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (id) => {
    await api.delete('/tipoEspecialidade/' + id);
    childRef.current.handleOpenMessage('Tipo de Especialidade deletado com sucesso!', 'success');
  }

  return (
    <>
    <Card className={clsx(classes.root, className)} {...rest} >
      <CardHeader title="Lista de Tipo de Especialidade" />
      <Divider />
      <PerfectScrollbar>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descrição</TableCell>                
              </TableRow>
            </TableHead>
            <TableBody>
              {specialtyTypes.slice(0, limit).map((specialtyType) => (
                <TableRow hover key={specialtyType.id} selected={selectedCustomerIds.indexOf(specialtyType.id) !== -1}>
                  <TableCell>{specialtyType.descricao}</TableCell>
                  <TableCell  align="right" width="30%">
                    <IconButton onClick={() => onEdit(specialtyType)}><EditIcon color="primary" /></IconButton>|
                    <IconButton onClick={() => handleDelete(specialtyType.id)}><DeleteIcon color="secondary"/></IconButton>
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
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  specialtyTypes: PropTypes.array.isRequired,
  onEdit: PropTypes.func
};

export default Results;
