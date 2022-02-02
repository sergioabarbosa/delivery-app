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
  formName: 'admin_manage__input-name',
  formEmail: 'admin_manage__input-email',
  formPassword: 'admin_manage__input-password',
  formRole: 'admin_manage__select-role',
  formBtn: 'admin_manage__button-register',
};

const orderCard = {
  seller: {
    id: 'seller_orders__element-order-id-',
    card: 'seller_orders__element-card-',
    status: 'seller_orders__element-delivery-status-',
    date: 'seller_orders__element-order-date-',
    price: 'seller_orders__element-card-price-',
    address: 'seller_orders__element-card-address-',
  },
  customer: {
    id: 'customer_orders__element-order-id-',
    card: 'customer_orders__element-card-',
    status: 'customer_orders__element-delivery-status-',
    date: 'customer_orders__element-order-date-',
    price: 'customer_orders__element-card-price-',
    address: 'customer_orders__element-card-address-',
  },
};

const orderDetail = {
  seller: {
    number: 'seller_order_details__element-order-details-label-order-id',
    date: 'seller_order_details__element-order-details-label-order-date',
    status: 'seller_order_details__element-order-details-label-delivery-status',
    btnPrep: 'seller_order_details__button-preparing-check',
    btn: 'seller_order_details__button-dispatch-check',
    tableNumber: 'seller_order_details__element-order-table-item-number-',
    tableName: 'seller_order_details__element-order-table-name-',
    tableQuantity: 'seller_order_details__element-order-table-quantity-',
    tableUnitPrice: 'seller_order_details__element-order-table-unit-price-',
    tableTotal: 'seller_order_details__element-order-table-sub-total-',
    totalPrice: 'seller_order_details__element-order-total-price',
  },
  customer: {
    number: 'customer_order_details__element-order-details-label-order-id',
    name: 'customer_order_details__element-order-details-label-seller-name',
    date: 'customer_order_details__element-order-details-label-order-date',
    status: 'customer_order_details__element-order-details-label-delivery-status',
    btn: 'customer_order_details__button-delivery-check',
    tableNumber: 'customer_order_details__element-order-table-item-number-',
    tableName: 'customer_order_details__element-order-table-name-',
    tableQuantity: 'customer_order_details__element-order-table-quantity-',
    tableUnitPrice: 'customer_order_details__element-order-table-sub-total-',
    tableTotal: 'customer_order_details__element-order-total-price-',
    totalPrice: 'customer_order_details__element-order-total-price',
  },
};

const orderList = {
  container: 'order-list-container',
};

const register = {
  name: 'common_register__input-name',
  email: 'common_register__input-email',
  password: 'common_register__input-password',
  registerBtn: 'common_register__button-register',
  errorMsg: 'common_register__element-invalid_register',
};

export default {
  login,
  navbar,
  productList,
  productCard,
  checkout,
  manageUsers,
  orderCard,
  orderDetail,
  orderList,
  register,
};
