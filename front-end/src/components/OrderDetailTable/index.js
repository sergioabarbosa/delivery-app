import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderContext } from '../../context';
import { orderHelper, dataTestIds } from '../../helpers';
import { userLocalStorage } from '../../services';
import './style.css';

const OrderDetailTable = () => {
  const { orders, updateStatus } = useContext(OrderContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { role } = userLocalStorage.get();

  useEffect(() => {
    const filteredOrder = orders.filter(({ id: orderId }) => orderId === +id);
    setOrder(filteredOrder[0]);
  }, [id, orders]);

  const handleBtnClick = () => {
    if (role === 'seller') return updateStatus(id, 'Em Trânsito');
    return updateStatus(id, 'Entregue');
  };

  const renderTableHead = () => (
    <thead>
      <tr>
        <th>Item</th>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Valor Unitário</th>
        <th>Total</th>
      </tr>
    </thead>
  );

  const renderSellerName = () => (
    <p
      className="seller-name"
      data-testid={ dataTestIds.orderDetail.customer.name }
    >
      { `P. Vend: ${order.seller.name}` }
    </p>
  );

  const renderFirstButton = () => (
    <button
      type="button"
      onClick={ () => updateStatus(id, 'Preparando') }
      data-testid={ dataTestIds.orderDetail.seller.btnPrep }
      disabled={ order.status !== 'Pendente' }
    >
      PREPARAR PEDIDO
    </button>
  );

  const renderTableContainerHeader = () => (
    <div className="table-container-header">
      <div className="left">
        <p data-testid={ dataTestIds.orderDetail[role].number }>
          { `PEDIDO ${orderHelper.getOrderNumber(id)}` }
        </p>
        { role === 'customer' && renderSellerName()}
        <p data-testid={ dataTestIds.orderDetail[role].date }>
          { orderHelper.formateDate(order.saleDate) }
        </p>
        <div
          className={ order.status }
          data-testid={ dataTestIds.orderDetail[role].status }
        >
          { order.status.toUpperCase() }
        </div>
      </div>
      <div className="right">
        { role === 'seller' && renderFirstButton() }
        <button
          type="button"
          onClick={ handleBtnClick }
          data-testid={ dataTestIds.orderDetail[role].btn }
          disabled={
            (role === 'seller' && order.status !== 'Preparando')
            || (role === 'customer' && order.status !== 'Em Trânsito')
          }
        >
          { role === 'seller' ? 'SAIU PARA ENTREGA' : 'MARCAR COMO ENTREGUE'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="orders-list-container">
      <h3>Detalhes do pedido</h3>
      <div className="table-container-2">
        { order && renderTableContainerHeader() }
        <table>
          { renderTableHead() }
          <tbody>
            { !order
              ? <tr><td>Carregando...</td></tr>
              : order.products.map(({ name, details: { quantity }, price }, index) => (
                <tr className="product-row" key={ `user-${index + 1}` }>
                  <td
                    data-testid={
                      `${dataTestIds.orderDetail[role].tableNumber}${index + 1}`
                    }
                  >
                    { index + 1 }
                  </td>
                  <td
                    data-testid={
                      `${dataTestIds.orderDetail[role].tableName}${index + 1}`
                    }
                  >
                    { name }
                  </td>
                  <td
                    data-testid={
                      `${dataTestIds.orderDetail[role].tableQuantity}${index + 1}`
                    }
                  >
                    { quantity }
                  </td>
                  <td
                    data-testid={
                      `${dataTestIds.orderDetail[role].tableUnitPrice}${index + 1}`
                    }
                  >
                    { `R$ ${price.replace('.', ',')}` }
                  </td>
                  <td
                    data-testid={
                      `${dataTestIds.orderDetail[role].tableTotal}${index + 1}`
                    }
                  >
                    { `R$ ${(+price * quantity).toFixed(2).replace('.', ',')}` }
                  </td>
                </tr>
              )) }
          </tbody>
        </table>
        <div
          className="total-price"
          data-testid={ dataTestIds.orderDetail[role].totalPrice }
        >
          { order && `Total: R$ ${(order.totalPrice.replace('.', ','))}` }
        </div>
      </div>
    </div>
  );
};

export default OrderDetailTable;
