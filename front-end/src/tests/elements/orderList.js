import { screen } from '@testing-library/react';
import dataTestIds from '../helpers/dataTestIds';

const getOrderCard = (role, index) => [
  screen.getByTestId(`${dataTestIds.orderCard[role].id}${index}`),
  screen.getByTestId(`${dataTestIds.orderCard[role].status}${index}`),
  screen.getByTestId(`${dataTestIds.orderCard[role].date}${index}`),
  screen.getByTestId(`${dataTestIds.orderCard[role].price}${index}`),
  screen.getByTestId(`${dataTestIds.orderCard[role].address}${index}`),
];

export default (role, orderQuantity) => {
  let orderCards = [];

  for (let i = 1; i <= orderQuantity; i += 1) {
    orderCards = orderCards.concat(getOrderCard(role, i));
  }

  return orderCards;
};
