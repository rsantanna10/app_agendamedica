import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

import MessageDiaglog from '../../../components/MessageDialog';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = forwardRef(({ className, ...rest }, ref) => {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const childRef = useRef();
  

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = () => {
    //setMessage('');
    childRef.current.handleOpenMessage('Tipo de Consulta cadastrada com sucesso!', 'success');
    setValues({ descricao: ''});
  }
  
  useImperativeHandle(ref, () => ({

    handleResetForm() {
      setValues({ descricao: ''});
    },
    handleSetValues(values) {
      setValues({
        ...values,
        [values.name]: values.value
      });
    }

  }));

  
  return (
    <form
      autoComplete="off"
      
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader title="Cadastro de Tipo de Consulta" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField fullWidth label="Descrição" name="descricao" onChange={handleChange} required value={values.descricao} variant="outlined" inputRef={input => input && input.focus()} />
            </Grid>            
          </Grid>
        </CardContent>
        <Divider />        
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={onSubmit}>Gravar</Button>
        </Box>
      </Card> 
      <MessageDiaglog ref={childRef} />
    </form>
  );
});

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
