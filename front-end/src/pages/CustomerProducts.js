import React from 'react';
import { Navbar, ProductList } from '../components';
import { ProductProvider } from '../context';

const CustomerProducts = () => (
  <ProductProvider>
    <Navbar />
    <ProductList />
  </ProductProvider>
);

export default CustomerProducts;
