import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ProductContext } from '../../context/product';
import './style.css';

const MINUS_ONE = -1;

const ProductCard = ({ product, index }) => {
  const [quantity, setQuantity] = useState(0);

  const {
    updateCheckout,
    removeProduct,
    checkout,
  } = useContext(ProductContext);

  useEffect(() => {
    if (checkout && checkout.length > 0) {
      const checkoutIndex = checkout.findIndex(({ id }) => id === product.id);
      if (checkoutIndex !== MINUS_ONE) {
        setQuantity(checkout[checkoutIndex].quantity);
      }
    }
  }, [checkout, index, product.id]);

  const { id, name, price, urlImage } = product;

  const handleChange = ({ target: { value } }) => {
    if (+value > 0) {
      setQuantity(+value);
      updateCheckout(product, +value);
    } else {
      setQuantity(0);
      removeProduct(product.id);
    }
  };

  const handleClick = (action) => {
    if (action === 'add') {
      setQuantity((prevQuantity) => {
        updateCheckout(product, prevQuantity + 1);
        return prevQuantity + 1;
      });
    } else {
      setQuantity((prevQuantity) => {
        updateCheckout(product, prevQuantity - 1);
        return prevQuantity - 1;
      });
    }
  };

  return (
    <div
      className="product-card-container"
      data-testid={ `customer_products__element-card-price-${index + 1}` }
    >
      <div className="product-card-img-container">
        <img
          className="product-card-img"
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${index + 1}` }
          src={ urlImage }
        />
      </div>
      <p className="product-card-price">
        R$
        {' '}
        <span
          id={ id }
          data-testid={ `customer_products__element-card-price-${index + 1}` }
        >
          { `${price.replace('.', ',')}` }
        </span>
      </p>
      <div className="product-card-bot">
        <p
          className="product-card-name"
          data-testid={ `customer_products__element-card-title-${index + 1}` }
        >
          {name}
        </p>
        <div className="product-card-quantity">
          <button
            type="button"
            value=""
            id="withdraw"
            onClick={ () => handleClick('sub') }
            data-testid={ `customer_products__button-card-rm-item-${index + 1}` }
            disabled={ !quantity }
          >
            -
          </button>
          <label htmlFor="quant">
            <input
              type="text"
              name="quant"
              id={ `quantity-${index + 1}` }
              onChange={ (e) => handleChange(e) }
              value={ quantity }
              data-testid={ `customer_products__input-card-quantity-${index + 1}` }
            />
          </label>
          <button
            type="button"
            value=""
            id="add"
            onClick={ () => handleClick('add') }
            data-testid={ `customer_products__button-card-add-item-${index + 1}` }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductCard;
