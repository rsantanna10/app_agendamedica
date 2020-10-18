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
import { Delete as DeleteIcon, Edit as EditIcon, Search} from '@material-ui/icons';
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

const Results = ({ className, users, onEdit, getUsers, ...rest }) => {
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
    await api.delete('/usuario/' + id);
    childRef.current.handleOpenMessage('Usuario deletado com sucesso!', 'success');
    getUsers();
  }

  const handlerSearch = () => {
    if(descricao !== '')
      users = users.filter(x => x.descricao === descricao);
  }

  return (
    <>
    <Card className={clsx(classes.root, className)} {...rest} >
      <CardHeader title="Lista de Usuários" />
      <Divider />
      <PerfectScrollbar>
        <Box display="flex" justifyContent="flex-end" >
          <div className={classes.wrapper}>
            <TextField label="Login" name="descricao" onChange={setDescricao} />&nbsp;{' '}&nbsp;
            <Search className={classes.icon} color="action" onClick={handlerSearch}/>
          </div>          
        </Box>  
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Tipo de Especialidade</TableCell>
                <TableCell>Login</TableCell>
                <TableCell>Ativo</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, limit).map((user) => (
                <TableRow hover key={user.id} selected={selectedCustomerIds.indexOf(user.id) !== -1}>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.tipo_especialidades.descricao}</TableCell>     
                  <TableCell>{user.login}</TableCell>     
                  <TableCell>{user.ativo ? 'Sim' : 'Não'}</TableCell>     
                  <TableCell  align="right" width="30%">
                    <IconButton onClick={() => onEdit(user)}><EditIcon color="primary" /></IconButton>|
                    <IconButton onClick={() => handleDelete(user.id)}><DeleteIcon color="secondary"/></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </PerfectScrollbar>
      <TablePagination component="div"
        count={users.length}
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
  users: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  getUsers: PropTypes.func
};

export default Results;
