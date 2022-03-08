import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import puppeteer from 'puppeteer';
import { dataTestIds, renderWithRouter } from './helpers';
import App from '../App';
import {
  login,
  checkout,
  admin as adminAction,
  socket } from './actions';
import {
  navbar,
  productList,
  getProductCard,
  checkout as checkoutElements,
  admin,
  orderList,
  orderDetail } from './elements';

describe('01 - Testando se a Navbar', () => {
  let component;
  
  beforeEach(async () => {
    component = renderWithRouter(<App />);
  });

  afterEach(() => {
    component.unmount();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('tem todos os elementos esperandos', async () => {
    await waitFor(() => login.getInputs());
    login.admin();

    await waitFor(() => navbar());

    const btnOrders = screen.getByTestId(dataTestIds.navbar.common.navBtn);
    userEvent.click(btnOrders);

    const elements = navbar();
    elements.forEach((element) => expect(element).toBeInTheDocument());
  });

  it('volta pra página de login ao clicar em Sair', async () => {
    await waitFor(() => navbar());
    
    const exitButton = screen.getByTestId(dataTestIds.navbar.common.navLogout);
    userEvent.click(exitButton);

    await waitFor(() => expect(screen.getByTestId(dataTestIds.login.inputEmail))
      .toBeInTheDocument());
  });

  it('troca de página ao clicar nos botões quando na página de usuário', async () => {
    await waitFor(() => login.getInputs());
    login.customer();

    await waitFor(() => navbar());

    const btnOrders = screen.getByTestId(dataTestIds.navbar.common.navBtn);
    userEvent.click(btnOrders);
    
    await waitFor(() => expect(screen.getByTestId(dataTestIds.orderList.container))
    .toBeInTheDocument());
    
    const btnProducts = screen.getByTestId(dataTestIds.navbar.customer.navBtn);
    userEvent.click(btnProducts);

    await waitFor(() => expect(screen.getByTestId(dataTestIds.productList.checkoutBtn))
      .toBeInTheDocument());
    
    const exitButton = screen.getByTestId(dataTestIds.navbar.common.navLogout);
    userEvent.click(exitButton);
  });

  it('troca de página ao clicar nos botões quando na página de usuário', async () => {
    await waitFor(() => login.getInputs());
    login.seller();

    await waitFor(() => navbar());

    const btnOrders = screen.getByTestId(dataTestIds.navbar.common.navBtn);
    userEvent.click(btnOrders);

    await waitFor(() => expect(screen.getByTestId(dataTestIds.orderList.container))
    .toBeInTheDocument());
  });
});

describe('02 - Testando se a página "/login"', () => {
  let component;
  let emailInput;
  let passwordInput;
  
  beforeEach(async () => {
    component = renderWithRouter(<App />);
    await waitFor(() => login.getInputs());
    emailInput = screen.getByTestId(dataTestIds.login.inputEmail);
    passwordInput = screen.getByTestId(dataTestIds.login.inputPassword);
  });

  afterEach(() => {
    component.unmount();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('não permite login com dados inválidos', () => {
    let loginBtn = screen.getByTestId(dataTestIds.login.loginBtn);
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'email@errado');
    userEvent.type(passwordInput, '123456789');

    loginBtn = screen.getByTestId(dataTestIds.login.loginBtn);
    expect(loginBtn).toBeDisabled();
  });

  it('permite login com dados corretos', () => {
    let loginBtn = screen.getByTestId(dataTestIds.login.loginBtn);
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'email@certo.com');
    userEvent.type(passwordInput, '123456789');

    loginBtn = screen.getByTestId(dataTestIds.login.loginBtn);
    expect(loginBtn).not.toBeDisabled();
  });

  it('não permite login com dados válidos pórem não cadastrados', async () => {
    const loginBtn = screen.getByTestId(dataTestIds.login.loginBtn);

    userEvent.type(emailInput, 'email@certo.com');
    userEvent.type(passwordInput, '123456789');

    userEvent.click(loginBtn);

    await waitFor(() => expect(screen.getByTestId(dataTestIds.login.loginError))
      .toBeInTheDocument());
  });

  it('redireciona para página de registro ao clicar no botão', async () => {
    const registerBtn = screen.getByTestId(dataTestIds.login.registerBtn);
    userEvent.click(registerBtn);
    await waitFor(() => expect(screen.getByTestId(dataTestIds.register.name))
      .toBeInTheDocument());
  });
});

describe('03 - Testando se a página "/register"', () => {
  let component;
  let nameInput;
  let emailInput;
  let passwordInput;
  
  beforeEach(async () => {
    component = renderWithRouter(<App />);
    await waitFor(() => login.getInputs());

    const registerPageBtn =  screen.getByTestId(dataTestIds.login.registerBtn);
    userEvent.click(registerPageBtn);

    await waitFor(() => screen.getByTestId(dataTestIds.register.email));

    nameInput = screen.getByTestId(dataTestIds.register.name);
    emailInput = screen.getByTestId(dataTestIds.register.email);
    passwordInput = screen.getByTestId(dataTestIds.register.password);
  });

  afterEach(() => {
    component.unmount();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('não permite registro com dados inváligos', () => {
    let registerBtn = screen.getByTestId(dataTestIds.register.registerBtn);
    expect(registerBtn).toBeDisabled();

    userEvent.type(nameInput, 'Usuário Teste');
    userEvent.type(emailInput, 'email@errado');
    userEvent.type(passwordInput, '123456789');

    registerBtn = screen.getByTestId(dataTestIds.register.registerBtn);
    expect(registerBtn).toBeDisabled();
  });

  it('permite registro com dados váligos e envia pra página de produtos', async () => {
    let registerBtn = screen.getByTestId(dataTestIds.register.registerBtn);
    expect(registerBtn).toBeDisabled();

    userEvent.type(nameInput, 'Usuário Teste');
    userEvent.type(emailInput, 'email@certo.com');
    userEvent.type(passwordInput, '123456789');

    registerBtn = screen.getByTestId(dataTestIds.register.registerBtn);
    expect(registerBtn).not.toBeDisabled();

    userEvent.click(registerBtn);

    await waitFor(() => expect(screen.getByTestId(dataTestIds.productList.checkoutBtn))
      .toBeInTheDocument());
    userEvent.click(screen.getByTestId(dataTestIds.navbar.common.navLogout));
  });

  it('não permite registro de usuário que já existe', async () => {
    const registerBtn = screen.getByTestId(dataTestIds.register.registerBtn);
    userEvent.type(nameInput, 'Usuário Teste');
    userEvent.type(emailInput, 'email@certo.com');
    userEvent.type(passwordInput, '123456789');
    userEvent.click(registerBtn);

    await waitFor(() => expect(screen.getByTestId(dataTestIds.register.errorMsg))
      .toBeInTheDocument());
  });
});

describe('04 - Testando se a página "/customer/products"', () => {
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

describe('05 - Testando se a página "/customer/checkout"', () => {
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

    expect(screen.getByTestId(dataTestIds.checkout.totalPrice)).toHaveTextContent(/66,89/);
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

describe('06 - Testando se a página "/admin/manage"', () => {
  let component;

  beforeAll(async () => {
    component = renderWithRouter(<App />);
    await waitFor(() => login.getInputs());
    login.admin();
  });

  beforeEach(async () => {
    component = renderWithRouter(<App />);
    await waitFor(() => navbar());
    await waitFor(() => admin(2));
  });

  afterEach(() => {
    component.unmount();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('apresenta todos os elementos na tela', () => {
    const elements = admin(2);
    elements.forEach((element) => expect(element).toBeInTheDocument());
  });

  it('apresenta o primeiro usuário com as informações corretas', () => {
    expect(
      screen.getByTestId(`${dataTestIds.manageUsers.item}1`)
    ).toHaveTextContent('1');
    expect(
      screen.getByTestId(`${dataTestIds.manageUsers.name}1`)
    ).toHaveTextContent('Fulana Pereira');
    expect(
      screen.getByTestId(`${dataTestIds.manageUsers.email}1`)
    ).toHaveTextContent('fulana@deliveryapp.com');
    expect(
      screen.getByTestId(`${dataTestIds.manageUsers.role}1`)
    ).toHaveTextContent('P. Vendedora');
    expect(
      screen.getByTestId(`${dataTestIds.manageUsers.remove}1`)
    ).toHaveTextContent('Excluir');
  });

  it('permite a adição de um novo usuário', async () => {
    let removeButtons = screen.getAllByRole('button', { name: 'Excluir' });
    expect(removeButtons).toHaveLength(3);

    adminAction.createNewUser();
    await waitFor(() => screen.getByTestId(`${dataTestIds.manageUsers.remove}3`));

    removeButtons = screen.getAllByRole('button', { name: 'Excluir' });
    expect(removeButtons).toHaveLength(3);
  });

  it('não permite a adição de usuário já existente', async () => {
    adminAction.createNewUser();
    await waitFor(() => expect(
        screen.getByTestId('admin_manage__element-invalid-register')
      ).toBeInTheDocument()
    );
  });

  it('permite a remoção de um usuário', async () => {
    let removeButtons = screen.getAllByRole('button', { name: 'Excluir' });
    expect(removeButtons).toHaveLength(4);

    adminAction.removeUser();
    await waitForElementToBeRemoved(screen.getByTestId(`${dataTestIds.manageUsers.remove}4`));

    removeButtons = screen.getAllByRole('button', { name: 'Excluir' });
    expect(removeButtons).toHaveLength(3);
  });
});

describe('07 - Testando se a página "/seller/orders"', () => {
  let component;

  beforeAll(async () => {
    component = renderWithRouter(<App />);
    await waitFor(() => login.getInputs());
    login.seller();
  });

  beforeEach(async () => {
    component = renderWithRouter(<App />);
    await waitFor(() => navbar());
    await waitFor(() => orderList('seller', 1));
  });

  afterEach(() => {
    component.unmount();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('apresenta todos os elementos na tela', () => {
    const elements = orderList('seller', 1);
    elements.forEach((element) => expect(element).toBeInTheDocument());
  });

  it('direciona para a tela de detalhes do pedido ao clicar no card', async () => {
    const firstCard = screen.getByTestId(`${dataTestIds.orderCard.seller.card}1`);
    userEvent.click(firstCard);

    let orderNumber;

    await waitFor(() => orderNumber = screen
      .getByTestId(dataTestIds.orderDetail.seller.number));
    
    expect(orderNumber).toHaveTextContent(/0001/i);
  });

  it('a tela do pedido tem todos os elementos na tela', async () => {
    const firstCard = screen.getByTestId(`${dataTestIds.orderCard.seller.card}1`);
    userEvent.click(firstCard);

    await waitFor(() => orderDetail('seller', 3));
    const elements = orderDetail('seller', 3);

    elements.forEach((element) => expect(element).toBeInTheDocument());
  });

  it('ao clicar nos botões o status muda', async () => {
    const firstCard = screen.getByTestId(`${dataTestIds.orderCard.seller.card}1`);
    userEvent.click(firstCard);

    await waitFor(() => orderDetail('seller', 3));
    
    const prepareButton = screen.getByTestId(dataTestIds.orderDetail.seller.btnPrep);
    userEvent.click(prepareButton);

    await waitFor(() => expect(screen.getByTestId(dataTestIds.orderDetail.seller.status))
      .toHaveTextContent('Preparando'));

    // const dispatchButton = screen.getByTestId(dataTestIds.orderDetail.seller.btn);
    // userEvent.click(dispatchButton);

    // await waitFor(() => expect(screen.getByTestId(dataTestIds.orderDetail.seller.status))
    //   .toHaveTextContent('Em Trânsito'));
  });
});

describe('08 - Testando se a página de detalhes do pedido', () => {
  let browser;
  let pageOne;
  let pageTwo;
  const BASE_URL = 'http://localhost:3000/';

  jest.setTimeout(30000);

  beforeAll(async () => {
    browser = await puppeteer
      .launch({
        args: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--window-size=1920,1080'
        ],
        headless: true,
      });

      pageOne = await browser.newPage();
      const context = await browser.createIncognitoBrowserContext();
      pageTwo = await context.newPage();
    
      await pageOne.goto(BASE_URL);
      await socket.loginCustomer(pageOne);

      await pageTwo.goto(BASE_URL);
      await socket.loginSeller(pageTwo);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('apresente o status de "Preparando" para cliente e vendedor', async () => {
    const customerStatus = await socket.getInnerText(
      pageOne,
      'customer_order_details__element-order-details-label-delivery-status',
    );
    expect(customerStatus).toBe('Preparando');

    const sellerStatus = await socket.getInnerText(
      pageTwo,
      'seller_order_details__element-order-details-label-delivery-status',
    );
    expect(sellerStatus).toBe('Preparando');
  });

  it('muda o status do pedido para "Em Trânsito" para cliente e vendedor ao clicar no botão', async () => {
    const dispatchButton = await pageTwo.$(
      `${socket.dataTestid('seller_order_details__button-dispatch-check')}`,
    );
    await dispatchButton.click();

    await pageOne.waitForTimeout(500);

    const customerStatus = await socket.getInnerText(
      pageOne,
      'customer_order_details__element-order-details-label-delivery-status',
    );
    expect(customerStatus).toBe('Em Trânsito');

    const sellerStatus = await socket.getInnerText(
      pageTwo,
      'seller_order_details__element-order-details-label-delivery-status',
    );
    expect(sellerStatus).toBe('Em Trânsito');
  });

  it('muda o status do pedido para "Entregue" para cliente e vendedor ao clicar no botão', async () => {
    const deliveredButton = await pageOne.$(
      `${socket.dataTestid('customer_order_details__button-delivery-check')}`,
    );
    await deliveredButton.click();

    await pageOne.waitForTimeout(500);

    const customerStatus = await socket.getInnerText(
      pageOne,
      'customer_order_details__element-order-details-label-delivery-status',
    );
    expect(customerStatus).toBe('Entregue');

    const sellerStatus = await socket.getInnerText(
      pageTwo,
      'seller_order_details__element-order-details-label-delivery-status',
    );
    expect(sellerStatus).toBe('Entregue');
  });
});