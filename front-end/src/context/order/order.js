import React, { useState, createContext, useEffect } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { orderAPI, userLocalStorage, validate } from '../../services';

const socket = io('http://localhost:3001/');

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const { token } = userLocalStorage.get();
  const [orders, setOrders] = useState([]);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (mounted) {
      (async () => {
        try {
          const response = await orderAPI.getAll(token);
          setOrders(response);
        } catch (e) {
          console.log(e);
        }
      })();
    }

    return () => setMounted(false);
  }, [mounted, token]);

  const changeLocalStatus = (id, status) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === +id) {
        return { ...order, status };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  socket.on('updateStatus', ({ id, status }) => {
    changeLocalStatus(id, status);
  });

  const updateStatus = async (id, status) => {
    try {
      const { error } = validate.status(status);
      if (!error) {
        socket.emit('updateStatus', { id, status });
        changeLocalStatus(id, status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const orderContextValue = {
    orders,
    setOrders,
    updateStatus,
  };

  return (
    <OrderContext.Provider value={ orderContextValue }>
      {children}
    </OrderContext.Provider>
  );
};

OrderProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default OrderProvider;
