import React from 'react';
import { Navbar, OrderList } from '../components';
import { OrderProvider } from '../context';

const CustomerOrders = () => (
  <OrderProvider>
    <Navbar />
    <OrderList />
  </OrderProvider>
);

export default CustomerOrders;
