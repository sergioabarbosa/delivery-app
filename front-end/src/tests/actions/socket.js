const loginInputDataTestId = 'common_login__input-email';

const dataTestid = (name) => `[data-testid=${name}]`;

const loginCustomer = async (customerPage) => {
  await customerPage.waitForSelector(`input${dataTestid(loginInputDataTestId)}`);

  const emailInput = await customerPage
    .$(`input${dataTestid(loginInputDataTestId)}`);
  await emailInput.type('zebirita@email.com');
  const passwordInput = await customerPage
    .$(`input${dataTestid('common_login__input-password')}`);
  await passwordInput.type('$#zebirita#$');
  const loginBtn = await customerPage
    .$(`button${dataTestid('common_login__button-login')}`);
  await loginBtn.click();

  await customerPage.waitForSelector(
    `button${dataTestid('customer_products__element-navbar-link-orders')}`,
  );
  const ordersButton = await customerPage
    .$(`button${dataTestid('customer_products__element-navbar-link-orders')}`);
  await ordersButton.click();

  await customerPage.waitForSelector(
    `div${dataTestid('customer_orders__element-card-1')}`,
  );
  const firstOrder = await customerPage
    .$(`div${dataTestid('customer_orders__element-card-1')}`);
  await firstOrder.click();
  await customerPage.waitForSelector(
    `div${dataTestid(
      'customer_order_details__element-order-details-label-delivery-status',
    )}`,
  );
};

const loginSeller = async (sellerPage) => {
  await sellerPage.waitForSelector(`input${dataTestid(loginInputDataTestId)}`);

  const emailInput = await sellerPage
    .$(`input${dataTestid(loginInputDataTestId)}`);
  await emailInput.type('fulana@deliveryapp.com');
  const passwordInput = await sellerPage
    .$(`input${dataTestid('common_login__input-password')}`);
  await passwordInput.type('fulana@123');
  const loginBtn = await sellerPage
    .$(`button${dataTestid('common_login__button-login')}`);
  await loginBtn.click();

  await sellerPage.waitForSelector(`div${dataTestid('seller_orders__element-card-1')}`);
  const firstOrder = await sellerPage
    .$(`div${dataTestid('seller_orders__element-card-1')}`);
  await firstOrder.click();
  await sellerPage.waitForSelector(
    `div${dataTestid(
      'seller_order_details__element-order-details-label-delivery-status',
    )}`,
  );
};

/* istanbul ignore next */
const getInnerText = async (page, dataTestId) => page.$eval(
  `div${dataTestid(dataTestId)}`,
  (element) => element.innerText,
);

export default {
  dataTestid,
  loginCustomer,
  loginSeller,
  getInnerText,
};
