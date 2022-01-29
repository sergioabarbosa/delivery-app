import React from 'react';
import { CheckoutDetailTable, CheckoutInfoForm, Navbar } from '../components';
import { ProductProvider } from '../context';

const CustomerCheckout = () => (
  <ProductProvider>
    <Navbar />
    <CheckoutDetailTable />
    <CheckoutInfoForm />
  </ProductProvider>
);

export default CustomerCheckout;
