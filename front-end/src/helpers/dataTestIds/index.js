const user = {
  item: 'admin_manage__element-user-table-item-number-',
  name: 'admin_manage__element-user-table-name-',
  email: 'admin_manage__element-user-table-email-',
  role: 'admin_manage__element-user-table-role-',
  remove: 'admin_manage__element-user-table-remove-',
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

export default {
  user,
  orderDetail,
  checkout,
};
