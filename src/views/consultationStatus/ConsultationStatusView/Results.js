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
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, consultationStatus, ...rest }) => {
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

  return (
    <Card className={clsx(classes.root, className)} {...rest} >
      <CardHeader title="Lista de Situação de Consulta" />
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
              {consultationStatus.slice(0, limit).map((consultation) => (
                <TableRow hover key={consultation.id} selected={selectedCustomerIds.indexOf(consultation.id) !== -1}>
                  <TableCell>{consultation.descricao}</TableCell>                
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
  );
};

Results.propTypes = {
  className: PropTypes.string,
  consultationStatus: PropTypes.array.isRequired
};

export default Results;