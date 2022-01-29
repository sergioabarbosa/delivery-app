import React, { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { checkoutLocalStorage, userLocalStorage, productAPI } from '../../services';

export const ProductContext = createContext();

const MINUS_ONE = -1;

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [checkout, setCheckout] = useState(checkoutLocalStorage.get() || []);
  const [token] = useState(userLocalStorage.get().token);

  useEffect(() => {
    (async () => {
      const prod = await productAPI.getAll(token);
      setProducts(prod);
    })();
  }, [setProducts, token]);

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

  const productContextValue = {
    products,
    checkout,
    setProducts,
    updateCheckout,
    removeProduct,
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
