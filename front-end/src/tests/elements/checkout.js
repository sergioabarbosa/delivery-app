import { screen } from '@testing-library/react';
import dataTestIds from '../helpers/dataTestIds';

export const getProductRow = (index) => {
  const productRowNumber = screen
    .getByTestId(`${dataTestIds.checkout.tableNumber}${index}`);
  const productRowName = screen
    .getByTestId(`${dataTestIds.checkout.tableName}${index}`);
  const productRowQuantity = screen
    .getByTestId(`${dataTestIds.checkout.tableQuantity}${index}`);
  const productRowPrice = screen
    .getByTestId(`${dataTestIds.checkout.tablePrice}${index}`);
  const productRowSubTotal = screen
    .getByTestId(`${dataTestIds.checkout.tableSubTotal}${index}`);
  const productRowRmBtn = screen
    .getByTestId(`${dataTestIds.checkout.tableRemove}${index}`);

  return [
    productRowNumber,
    productRowName,
    productRowQuantity,
    productRowPrice,
    productRowSubTotal,
    productRowRmBtn,
  ];
};

const getAllRows = (quantity) => {
  let rows = [];
  for (let i = 0; i < quantity; i += 1) {
    rows = [...rows.concat(getProductRow(i))];
  }
  return rows;
};

const getFormElements = () => ([
  screen.getByTestId(dataTestIds.checkout.formSeller),
  screen.getByTestId(dataTestIds.checkout.formAddress),
  screen.getByTestId(dataTestIds.checkout.formNumber),
  screen.getByTestId(dataTestIds.checkout.formBtn),
]);

export default (rowsQuantity) => {
  const totalPrice = screen.getByTestId(dataTestIds.checkout.totalPrice);
  const productRows = getAllRows(rowsQuantity);
  const checkoutForm = getFormElements();
  return [
    totalPrice,
    ...productRows,
    ...checkoutForm,
  ];
};
