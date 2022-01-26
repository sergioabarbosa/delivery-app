import React from 'react';
import { UserDetailTable, Navbar } from '../components';
import { UserProvider } from '../context';

const Admin = () => (
  <UserProvider>
    <Navbar />
    <UserDetailTable />
  </UserProvider>
);

export default Admin;
