import React, { useContext, useState } from 'react';
import OrderCard from '../OrderCard/OrderCard';
import { OrderContext } from '../../context';
import { userLocalStorage } from '../../services';
import './style.css';

const OrderList = () => {
  const { orders } = useContext(OrderContext);
  const [user] = useState(userLocalStorage.get());

  const { role, id } = user;

  return (
    <div
      className="order-list-container"
      data-testid="order-list-container"
    >
      {
        orders.filter(({ seller, customer }) => id === seller.id || id === customer.id)
          .map((order, index) => (
            <OrderCard
              key={ `order-card-${index + 1}` }
              order={ order }
              role={ role }
            />
          ))
      }
    </div>
  );
};

export default OrderList;
