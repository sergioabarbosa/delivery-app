import React from 'react';
import { Navbar, NewUserForm, UserDetailTable } from '../components';
import { UserProvider } from '../context';

const Admin = () => (
  <UserProvider>
    <Navbar />
    <NewUserForm />
    <UserDetailTable />
  </UserProvider>
);

export default Admin;
