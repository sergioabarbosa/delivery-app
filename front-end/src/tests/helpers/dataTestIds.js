const login = {
  inputEmail: 'common_login__input-email',
  inputPassword: 'common_login__input-password',
  loginBtn: 'common_login__button-login',
  registerBtn: 'common_login__button-register',
  loginError: 'common_login__element-invalid-email',
};

const navbar = {
  common: {
    navBtn: 'customer_products__element-navbar-link-orders',
    navName: 'customer_products__element-navbar-user-full-name',
    navLogout: 'customer_products__element-navbar-link-logout',
  },
  customer: {
    navBtn: 'customer_products__element-navbar-link-products',
  },
};

const productList = {
  checkoutBtn: 'customer_products__button-cart',
  checkoutBtnValue: 'customer_products__checkout-bottom-value',
};

const productCard = {
  price: 'customer_products__element-card-price-',
  image: 'customer_products__img-card-bg-image-',
  title: 'customer_products__element-card-title-',
  btnAdd: 'customer_products__button-card-add-item-',
  quantity: 'customer_products__input-card-quantity-',
  btnRm: 'customer_products__button-card-rm-item-',
};

const checkout = {
  tableNumber: 'customer_checkout__element-order-table-item-number-',
  tableName: 'customer_checkout__element-order-table-name-',
  tableQuantity: 'customer_checkout__element-order-table-quantity-',
  tablePrice: 'customer_checkout__element-order-table-unit-price-',
  tableSubTotal: 'customer_checkout__element-order-table-sub-total-',
  tableRemove: 'customer_checkout__element-order-table-remove-',
  totalPrice: 'customer_checkout__element-order-total-price',
  formSeller: 'customer_checkout__select-seller',
  formAddress: 'customer_checkout__input-address',
  formNumber: 'customer_checkout__input-addressNumber',
  formBtn: 'customer_checkout__button-submit-order',
};

const manageUsers = {
  item: 'admin_manage__element-user-table-item-number-',
  name: 'admin_manage__element-user-table-name-',
  email: 'admin_manage__element-user-table-email-',
  role: 'admin_manage__element-user-table-role-',
  remove: 'admin_manage__element-user-table-remove-',
};

export default {
  login,
  navbar,
  productList,
  productCard,
  checkout,
  manageUsers,
};
