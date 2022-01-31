import { screen } from '@testing-library/react';
import dataTestIds from '../helpers/dataTestIds';

export const getProductCard = (index) => {
  const productPrice = screen.getByTestId(`${dataTestIds.productCard.price}${index}`);
  const productImage = screen.getByTestId(`${dataTestIds.productCard.image}${index}`);
  const productTitle = screen.getByTestId(`${dataTestIds.productCard.title}${index}`);
  const productBtnAdd = screen.getByTestId(`${dataTestIds.productCard.btnAdd}${index}`);
  const productBtnRm = screen.getByTestId(`${dataTestIds.productCard.btnRm}${index}`);
  const productBtnQuantity = screen
    .getByTestId(`${dataTestIds.productCard.quantity}${index}`);

  return [
    productPrice,
    productImage,
    productTitle,
    productBtnAdd,
    productBtnRm,
    productBtnQuantity,
  ];
};

const getAllCards = (quantity) => {
  let cards = [];
  for (let i = 1; i <= quantity; i += 1) {
    cards = [...cards.concat(getProductCard(i))];
  }
  return cards;
};

export default (cardsQuantity) => {
  const checkoutBtn = screen.getByTestId(dataTestIds.productList.checkoutBtn);
  const checkoutValue = screen.getByTestId(dataTestIds.productList.checkoutBtnValue);
  const productCards = getAllCards(cardsQuantity);
  return [
    checkoutBtn,
    checkoutValue,
    ...productCards,
  ];
};
