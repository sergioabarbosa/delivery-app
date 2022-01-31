import React from 'react';
import { Route, Routes as Switch, Navigate } from 'react-router-dom';
import {
  Login,
  Admin,
  Register,
  CustomerProducts,
  CustomerOrders,
  CustomerOrderDetails,
  CustomerCheckout,
  SellerOrders,
  SellerOrderDetails,
} from '../pages';

const Routes = () => (
  <Switch>
    <Route path="/admin/manage" element={ <Admin /> } />
    <Route path="/seller/orders/:id" element={ <SellerOrderDetails /> } />
    <Route path="/seller/orders" element={ <SellerOrders /> } />
    <Route path="/customer/orders/:id" element={ <CustomerOrderDetails /> } />
    <Route path="/customer/orders" element={ <CustomerOrders /> } />
    <Route path="/customer/products" element={ <CustomerProducts /> } />
    <Route path="/customer/checkout" element={ <CustomerCheckout /> } />
    <Route path="/register" element={ <Register /> } />
    <Route path="/login" element={ <Login /> } />
    <Route exact path="/" element={ <Navigate to="/login" /> } />
  </Switch>
);

export default Routes;
