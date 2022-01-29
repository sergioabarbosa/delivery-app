import React, { useContext } from 'react';
import { ProductContext } from '../../context';
import { dataTestIds } from '../../helpers';
import './style.css';

const ZERO = 0;

const CheckoutDetailTable = () => {
  const { checkout, removeProduct } = useContext(ProductContext);

  const checkCheckout = () => checkout && checkout.length > 0;

  const renderTableHead = () => (
    <thead>
      <tr>
        <th>Item</th>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Valor Unitário</th>
        <th>Sub-Total</th>
        <th>Remover</th>
      </tr>
    </thead>
  );

  const getTotalPrice = () => {
    if (!checkout || checkout.length === 0) {
      return ZERO.toFixed(2).replace('.', ',');
    }
    return checkout
      .reduce((acc, { quantity, price }) => acc + (quantity * +price), 0)
      .toFixed(2).replace('.', ',');
  };

  return (
    <div className="checkout-list-container">
      <h3>Finalizar pedido</h3>
      <div className="table-container-3">
        <table>
          { renderTableHead() }
          <tbody>
            { !checkCheckout()
              ? <tr><td>Carregando...</td></tr>
              : checkout.map(({ id, name, quantity, price }, index) => (
                <tr className="product-checkout-row" key={ `product-${index + 1}` }>
                  <td
                    data-testid={
                      `${dataTestIds.checkout.tableNumber}${index}`
                    }
                  >
                    { index + 1 }
                  </td>
                  <td
                    data-testid={
                      `${dataTestIds.checkout.tableName}${index}`
                    }
                  >
                    { name }
                  </td>
                  <td
                    data-testid={
                      `${dataTestIds.checkout.tableQuantity}${index}`
                    }
                  >
                    { quantity }
                  </td>
                  <td
                    data-testid={
                      `${dataTestIds.checkout.tablePrice}${index}`
                    }
                  >
                    { `R$ ${price.replace('.', ',')}` }
                  </td>
                  <td
                    data-testid={
                      `${dataTestIds.checkout.tableSubTotal}${index}`
                    }
                  >
                    { `R$ ${(+price * quantity).toFixed(2).replace('.', ',')}` }
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={ () => removeProduct(id) }
                      data-testid={
                        `${dataTestIds.checkout.tableRemove}${index}`
                      }
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              )) }
          </tbody>
        </table>
        <div
          className="total-price"
          data-testid={ `${dataTestIds.checkout.totalPrice}` }
        >
          {
            checkCheckout() && `Total: R$ ${(getTotalPrice())}`
          }
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetailTable;
