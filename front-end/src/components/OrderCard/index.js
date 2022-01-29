import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { orderHelper } from '../../helpers';
import './style.css';

const OrderCard = ({ order, index, role }) => {
  const navigate = useNavigate();

  const {
    id,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  } = order;

  return (
    <div
      className="order-card-container"
      aria-hidden="true"
      onClick={ () => navigate(`/${role}/orders/${id}`) }
    >
      <div className="order-number-container">
        <p>Pedido</p>
        <p
          data-testid={ `seller_orders__element-order-id-${index + 1}` }
        >
          { orderHelper.getOrderNumber(id) }
        </p>
      </div>
      <div className="order-info-container">
        <div className="order-info-cima">
          <div
            data-testeid={ `seller_orders__element-delivery-status-${index + 1}` }
            className={ `order-info-status ${status}` }
          >
            {status.toUpperCase()}
          </div>
          <div className="order-info-numbers">
            <div>{orderHelper.formateDate(saleDate)}</div>
            <div>{`R$ ${totalPrice.replace('.', ',')}`}</div>
          </div>
        </div>
        <p
          data-testid={ `seller_orders__element-card-address-${index + 1}` }
          className="order-info-baixo"
        >
          {`${deliveryAddress}, ${deliveryNumber}`}
        </p>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    totalPrice: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
};

export default OrderCard;
