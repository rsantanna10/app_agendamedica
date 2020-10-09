import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Shield as ShieldIcon,
  BarChart as BarChartIcon,
  Archive as ArchiveIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  PlusSquare as PlusSquareIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Calendar as CalendarIcon
} from 'react-feather';
import NavItem from './NavItem';

let user = {
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

user.jobTitle = 'Dentista';
user.name = 'Renato Sant\' Anna';

const isAdmin = true;
let items = [];

if (isAdmin) {
 items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/calendar',
    icon: CalendarIcon,
    title: 'Agenda Médica'
  },
  {
    href: '/app/pacients',
    icon: UserPlusIcon,
    title: 'Pacientes'
  },
  {
    href: '/app/users',
    icon: UsersIcon,
    title: 'Usuários'
  },
  {
    href: '/app/consultationStatus',
    icon: ShieldIcon,
    title: 'Situações de Consulta'
  },
  {
    href: '/app/specialtyTypes',
    icon: PlusSquareIcon,
    title: 'Tipos de Especialidade'
  },
  {
    href: '/app/consultationTypes',
    icon: ArchiveIcon,
    title: 'Tipos de Consulta'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Configurações'
  }/*,
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  } */
];
} else {
  items = [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard'
    },
    {
      href: '/app/customers',
      icon: UsersIcon,
      title: 'Agenda Médica'
    },
    {
      href: '/app/products',
      icon: ShoppingBagIcon,
      title: 'Pacientes'
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Configurações'
    }];

}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />      
    </Box>
  );

  return (
    <>
      <Hidden lgUp component={RouterLink}>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
