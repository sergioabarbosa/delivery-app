import { screen } from '@testing-library/react';
import dataTestIds from '../helpers/dataTestIds';

const gerProductRow = (role, index) => [
  screen.getByTestId(`${dataTestIds.orderDetail[role].tableNumber}${index}`),
  screen.getByTestId(`${dataTestIds.orderDetail[role].tableName}${index}`),
  screen.getByTestId(`${dataTestIds.orderDetail[role].tableQuantity}${index}`),
  screen.getByTestId(`${dataTestIds.orderDetail[role].tableUnitPrice}${index}`),
  screen.getByTestId(`${dataTestIds.orderDetail[role].tableTotal}${index}`),
];

const getGeneralElements = (role) => ([
  screen.getByTestId(dataTestIds.orderDetail[role].number),
  screen.getByTestId(dataTestIds.orderDetail[role].date),
  screen.getByTestId(dataTestIds.orderDetail[role].status),
  screen.getByTestId(dataTestIds.orderDetail[role].btnPrep),
  screen.getByTestId(dataTestIds.orderDetail[role].btn),
  screen.getByTestId(dataTestIds.orderDetail[role].totalPrice),
]);

export default (role, orderQuantity) => {
  let elements = [];

  for (let i = 1; i <= orderQuantity; i += 1) {
    elements = elements.concat(gerProductRow(role, i));
  }

  elements = elements.concat(getGeneralElements(role));

  return elements;
};
