import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { orderHelper } from '../../helpers';
import './style.css';

const OrderCard = ({ order, role }) => {
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
      data-testid={ `${role}_orders__element-card-${id}` }
    >
      <div className="order-number-container">
        <p>Pedido</p>
        <p
          data-testid={ `${role}_orders__element-order-id-${id}` }
        >
          { orderHelper.getOrderNumber(id) }
        </p>
      </div>
      <div className="order-info-container">
        <div className="order-info-cima">
          <div
            data-testid={ `${role}_orders__element-delivery-status-${id}` }
            className={ `order-info-status ${status}` }
          >
            {status}
          </div>
          <div className="order-info-numbers">
            <div
              data-testid={ `${role}_orders__element-order-date-${id}` }
            >
              {orderHelper.formateDate(saleDate)}
            </div>
            <div
              data-testid={ `${role}_orders__element-card-price-${id}` }
            >
              {`R$ ${totalPrice.replace('.', ',')}`}
            </div>
          </div>
        </div>
        <p
          data-testid={ `${role}_orders__element-card-address-${id}` }
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
  role: PropTypes.string.isRequired,
};

export default OrderCard;
