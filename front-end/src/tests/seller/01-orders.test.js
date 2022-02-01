import React from 'react';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { renderWithRouter } from '../helpers';
import App from '../../App';
import { login } from '../actions';
import { navbar, seller } from '../elements';

describe('Testando se a página "/admin/manage"', () => {
  let component;

  beforeAll(async () => {
    component = renderWithRouter(<App />);
    await waitFor(() => login.getInputs());
    login.seller();
  });

  beforeEach(async () => {
    component = renderWithRouter(<App />);
    await waitFor(() => navbar());
    await waitFor(() => seller());
  });

  afterEach(() => {
    component.unmount();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('apresenta todos os elementos na tela', () => {
    const elements = seller();
    elements.forEach((element) => expect(element).toBeInTheDocument());
  });
});
