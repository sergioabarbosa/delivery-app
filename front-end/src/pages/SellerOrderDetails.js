import React from 'react';
import { Navbar, OrderDetailTable } from '../components';
import { OrderProvider } from '../context';

const SellerOrderDetails = () => (
  <OrderProvider>
    <Navbar />
    <OrderDetailTable />
  </OrderProvider>
);

export default SellerOrderDetails;
