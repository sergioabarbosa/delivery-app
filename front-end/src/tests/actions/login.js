import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dataTestIds from '../helpers/dataTestIds';

const loginData = {
  admin: {
    email: 'adm@deliveryapp.com',
    password: '--adm2@21!!--',
  },
  seller: {
    email: 'fulana@deliveryapp.com',
    password: 'fulana@123',
  },
  customer: {
    email: 'zebirita@email.com',
    password: '$#zebirita#$',
  },
};

const getInputs = () => {
  const emailInput = screen.getByTestId(dataTestIds.login.inputEmail);
  const passwordInput = screen.getByTestId(dataTestIds.login.inputPassword);
  const loginBtn = screen.getByTestId(dataTestIds.login.loginBtn);

  return { emailInput, passwordInput, loginBtn };
};

const customer = () => {
  localStorage.clear();
  const { emailInput, passwordInput, loginBtn } = getInputs();
  userEvent.type(emailInput, loginData.customer.email);
  userEvent.type(passwordInput, loginData.customer.password);
  userEvent.click(loginBtn);
};

const seller = () => {
  localStorage.clear();
  const { emailInput, passwordInput, loginBtn } = getInputs();
  userEvent.type(emailInput, loginData.seller.email);
  userEvent.type(passwordInput, loginData.seller.password);
  userEvent.click(loginBtn);
};

const admin = () => {
  localStorage.clear();
  const { emailInput, passwordInput, loginBtn } = getInputs();
  userEvent.type(emailInput, loginData.admin.email);
  userEvent.type(passwordInput, loginData.admin.password);
  userEvent.click(loginBtn);
};

export default {
  customer,
  seller,
  admin,
  getInputs,
};
