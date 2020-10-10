import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import {
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from '@material-ui/core';

const data = [
  {
    id: uuid(),
    name: 'Renato',
    data: '12/10/2020 08:00'
  },
  {
    id: uuid(),
    name: 'Renato 2',
    data: '13/10/2020 12:00'
  }
];

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [pacients] = useState(data);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader subtitle={`${pacients.length} in total`} title="Próximas consultas"/>
      <Divider />
      <List>
        {pacients.map((pacient, i) => (
          <ListItem divider={i < pacients.length - 1} key={pacient.id}>
            <ListItemText primary={pacient.name} secondary={pacient.data} />
            <IconButton edge="end" size="small">
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
