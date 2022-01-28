import React, { useContext, useState } from 'react';
import OrderCard from '../OrderCard';
import { OrderContext } from '../../context';
import { userLocalStorage } from '../../services';
import './style.css';

const OrderList = () => {
  const { orders } = useContext(OrderContext);
  const [user] = useState(userLocalStorage.get());

  const { role, id } = user;

  return (
    <div className="order-list-container">
      {
        orders.filter(({ seller, customer }) => id === seller.id || id === customer.id)
          .map((order, index) => (
            <OrderCard
              key={ `order-card-${index + 1}` }
              order={ order }
              index={ index }
              role={ role }
            />
          ))
      }
    </div>
  );
};

export default OrderList;
