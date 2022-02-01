import React, { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import {
  checkoutLocalStorage,
  userLocalStorage,
  productAPI,
  orderAPI,
  validate } from '../../services';

export const ProductContext = createContext();

const MINUS_ONE = -1;

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [checkout, setCheckout] = useState(checkoutLocalStorage.get() || []);
  const [token] = useState(userLocalStorage.get().token);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (mounted) {
      (async () => {
        const prod = await productAPI.getAll(token);
        setProducts(prod);
      })();
    }

    return () => setMounted(false);
  }, [mounted, setProducts, token]);

  useEffect(() => {
    checkoutLocalStorage.save(checkout);
  }, [checkout]);

  const removeProduct = (productId) => setCheckout((prevCheckout) => prevCheckout
    .filter(({ id }) => id !== productId));

  const addProduct = (product, quantity) => {
    setCheckout((prevCheckout) => [...prevCheckout, { ...product, quantity }]);
  };

  const updateCheckout = (product, quantity) => {
    if (quantity === 0) return removeProduct(product.id);
    const index = checkout.findIndex(({ id }) => id === product.id);

    if (index === MINUS_ONE) return addProduct(product, quantity);

    setCheckout((prevCheckout) => prevCheckout
      .map((item) => {
        if (item.id === product.id) return { ...item, quantity };
        return item;
      }));
  };

  const getCheckout = () => {
    const checkoutProducts = checkout.map(({ id, quantity }) => ({ id, quantity }));
    const checkoutTotalPrice = +(checkout
      .reduce((acc, { price, quantity }) => acc + +price * quantity, 0).toFixed(2));
    const checkoutUserId = userLocalStorage.get().id;

    return {
      userId: checkoutUserId,
      totalPrice: checkoutTotalPrice,
      products: checkoutProducts,
    };
  };

  const postSale = async (checkoutInfo) => {
    try {
      const sale = {
        ...getCheckout(),
        ...checkoutInfo,
      };
      const { error } = validate.sale(sale);
      if (!error) {
        const { id } = await orderAPI.post(sale, token);
        return id;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const productContextValue = {
    products,
    checkout,
    setProducts,
    updateCheckout,
    removeProduct,
    postSale,
  };

  return (
    <ProductContext.Provider value={ productContextValue }>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProductProvider;
