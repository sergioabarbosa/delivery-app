import React from 'react';
import { Navbar, OrderList } from '../components';
import { OrderProvider } from '../context';

const SellerOrders = () => (
  <OrderProvider>
    <Navbar />
    <OrderList />
  </OrderProvider>
);

export default SellerOrders;
