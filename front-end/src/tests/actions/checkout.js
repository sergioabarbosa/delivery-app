import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { dataTestIds } from '../helpers';

const FOUR = 4;

const getCardElements = (index) => ({
  btnAdd: screen.getByTestId(`${dataTestIds.productCard.btnAdd}${index}`),
  btnRm: screen.getByTestId(`${dataTestIds.productCard.btnRm}${index}`),
  quantity: screen.getByTestId(`${dataTestIds.productCard.quantity}${index}`),
});

const getFourCards = () => {
  const result = {};
  for (let i = 1; i <= FOUR; i += 1) {
    result[`p${i}`] = getCardElements(i);
  }
  return result;
};

const create = () => {
  const products = getFourCards();

  userEvent.click(products.p1.btnAdd);
  userEvent.click(products.p1.btnAdd);

  userEvent.type(products.p2.quantity, '3');

  userEvent.click(products.p3.btnAdd);
  userEvent.click(products.p3.btnRm);
  userEvent.click(products.p3.btnAdd);
  userEvent.click(products.p3.btnAdd);
  userEvent.click(products.p3.btnRm);

  userEvent.type(products.p4.quantity, '5');
};

const removeThirdProduct = () => {
  const btnRm = screen.getByTestId(`${dataTestIds.checkout.tableRemove}2`);
  userEvent.click(btnRm);
};

const phillCheckoutForm = () => {
  const sellerSelect = screen.getByTestId(dataTestIds.checkout.formSeller);
  const deliveryAddressInput = screen.getByTestId(dataTestIds.checkout.formAddress);
  const deliveryNumberInput = screen.getByTestId(dataTestIds.checkout.formNumber);

  userEvent.selectOptions(sellerSelect, '2');
  userEvent.type(deliveryAddressInput, 'Rua Itacolomi, 14, Higienópolis');
  userEvent.type(deliveryNumberInput, '14');
};

export default {
  create,
  removeThirdProduct,
  phillCheckoutForm,
};
