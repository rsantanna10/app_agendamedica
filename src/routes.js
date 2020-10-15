import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import UsersView from 'src/views/users/UsersView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import ForgotPasswordView from 'src/views/auth/ForgotPasswordView';
import SettingsView from 'src/views/settings/SettingsView';
import SpecialtypesView from 'src/views/specialtyTypes/SpecialtyTypesView';
import ConsultationTypesView from 'src/views/consultationTypes/ConsultationTypesView';
import ConsultationStatusView from 'src/views/consultationStatus/ConsultationStatusView';
import CalendarView from 'src/views/calendar/CalendarView';
import PacientView from 'src/views/pacients/PacientsView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'users', element: <UsersView /> },
      { path: 'pacients', element: <PacientView /> },
      { path: 'specialtyTypes', element: <SpecialtypesView /> },
      { path: 'consultationTypes', element: <ConsultationTypesView /> },
      { path: 'consultationStatus', element: <ConsultationStatusView /> },
      { path: 'calendar', element: <CalendarView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'login', element: <LoginView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: 'forgot', element: <ForgotPasswordView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
