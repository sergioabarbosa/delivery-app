import React from 'react';
import '@testing-library/jest-dom';
import { findByTestId, findByText, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { dataTestIds, renderWithRouter } from '../helpers';
import App from '../../App';
import { login, checkout } from '../actions';
import { navbar, checkout as checkoutElements, productList } from '../elements';
import userEvent from '@testing-library/user-event';

describe('Testando se a página "/customer/checkout"', () => {
  let component;
  
  beforeAll(async () => {
    component = renderWithRouter(<App />);

    await waitFor(() => login.getInputs());
    login.customer();
  });

  beforeEach(async () => {
    component = renderWithRouter(<App />);
    await waitFor(() => navbar());
  });

  afterEach(() => {
    component.unmount();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('apresenta todos os elementos na tela', async () => {
    await waitFor(() => productList(1));
    checkout.create();
    userEvent.click(screen.getByTestId(dataTestIds.productList.checkoutBtn));

    await waitFor(() => {
      screen.getAllByTestId(dataTestIds.checkout.formBtn);
    });

    const elements = checkoutElements(4);
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('permite remover itens do carrinho', async () => {
    await waitFor(() => productList(1));
    userEvent.click(screen.getByTestId(dataTestIds.productList.checkoutBtn));

    await waitFor(() => {
      screen.getAllByTestId(dataTestIds.checkout.formBtn);
    });

    let removeBtns = screen.getAllByText(/^Remover$/);
    expect(removeBtns).toHaveLength(5);
    checkout.removeThirdProduct();
    removeBtns = screen.getAllByText(/^Remover$/);
    expect(removeBtns).toHaveLength(4);
  });

  it('permite preencher o formulário e adicionar a compra', async () => {
    await waitFor(() => productList(1));
    userEvent.click(screen.getByTestId(dataTestIds.productList.checkoutBtn));

    await waitFor(() => {
      screen.getAllByTestId(dataTestIds.checkout.formBtn);
    });

    expect(screen.getByTestId(dataTestIds.checkout.formBtn))
      .toBeDisabled();

    checkout.phillCheckoutForm();
    expect(screen.getByTestId(dataTestIds.checkout.formBtn))
      .not
      .toBeDisabled();
    
    userEvent.click(screen.getByTestId(dataTestIds.checkout.formBtn));
    await waitFor(() => screen.getByTestId('customer_order_details__element-order-details-label-order-id'));
    expect(screen.getByTestId('customer_order_details__element-order-details-label-order-id'))
      .toBeInTheDocument();
  })
});
