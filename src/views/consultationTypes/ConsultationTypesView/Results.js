import React, { useState } from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ onEdit, className, consultationTypes, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (id) => {
    alert('deletado => ' + id);
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest} >
      <CardHeader title="Lista de Tipo de Consulta" />
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
              {consultationTypes.slice(0, limit).map((consultationType) => (
                <TableRow hover key={consultationType.id} selected={selectedCustomerIds.indexOf(consultationType.id) !== -1}>
                  <TableCell>{consultationType.descricao}</TableCell>
                  <TableCell  align="right" width="30%">
                    <IconButton onClick={() => onEdit(consultationType)}><EditIcon color="primary" /></IconButton>|
                    <IconButton onClick={() => handleDelete(consultationType.id)}><DeleteIcon color="secondary"/></IconButton>
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
  );
};

Results.propTypes = {
  className: PropTypes.string,
  consultationTypes: PropTypes.array.isRequired,
  onEdit: PropTypes.func
};

export default Results;
