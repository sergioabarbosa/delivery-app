import React from 'react';
import { Navbar, OrderDetailTable } from '../components';
import { OrderProvider } from '../context';

const CustomerOrderDetails = () => (
  <OrderProvider>
    <Navbar />
    <OrderDetailTable />
  </OrderProvider>
);

export default CustomerOrderDetails;
