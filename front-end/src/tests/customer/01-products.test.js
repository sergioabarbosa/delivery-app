import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { dataTestIds, renderWithRouter } from '../helpers';
import App from '../../App';
import { login, checkout } from '../actions';
import { navbar, productList, getProductCard } from '../elements';
import userEvent from '@testing-library/user-event';

describe('Testando se a página "/customer/products"', () => {
  let component;
  
  beforeAll(async () => {
    component = renderWithRouter(<App />);
    await waitFor(() => login.getInputs());
    login.customer();
  });

  beforeEach(async () => {
    component = renderWithRouter(<App />);
    await waitFor(() => navbar());
    await waitFor(() => productList(1));
  });

  afterEach(() => {
    component.unmount();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('tem todos os elementos esperados', async () => {
    const elements = [
      ...navbar(),
      ...productList(11),
    ]
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('tem o primeiro card com as informações corretas', async () => {
    const productCardElements = getProductCard(1);
    expect(productCardElements[0]).toHaveTextContent('2,20');
    expect(productCardElements[1]).toHaveProperty('src', 'http://localhost:3001/images/skol_lata_350ml.jpg');
    expect(productCardElements[2]).toHaveTextContent('Skol Lata 250ml');
    expect(productCardElements[5]).toHaveValue('0');
  });

  it('indica o valor total dos produtos a medida que acrescentamos no carrinho', () => {
    checkout.create();

    const totalPriceTag = screen.getByTestId(dataTestIds.productList.checkoutBtnValue);
    expect(totalPriceTag).toHaveTextContent('66,89');
  });

  it('encaminha para a página "/custumer/checkout" ao clicar no botão de total', async () => {
    const totalPriceBtn = screen.getByTestId(dataTestIds.productList.checkoutBtn);
    userEvent.click(totalPriceBtn);

    await waitFor(() => expect(screen
      .getByTestId(dataTestIds.checkout.totalPrice))
      .toBeInTheDocument());
  });
});
