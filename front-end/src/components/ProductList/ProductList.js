import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { ProductContext } from '../../context';
import './style.css';

const ProductList = () => {
  const {
    products,
    checkout,
  } = useContext(ProductContext);
  const navigate = useNavigate();

  const getTotalPrice = () => {
    if (!checkout || checkout.length === 0) {
      return 0;
    }
    return checkout.reduce((acc, curr) => acc + (curr.quantity * +curr.price), 0);
  };

  return (
    <section className="order-list-container">
      {products && products.length ? products.map((product, index) => (
        <ProductCard key={ `card-${index + 1}` } product={ product } index={ index } />
      )) : <span>Loading</span>}
      <button
        className="total-price-fixed"
        type="button"
        onClick={ () => navigate('/customer/checkout') }
        data-testid="customer_products__button-cart"
        disabled={ !checkout || checkout.length === 0 }
      >
        Ver carrinho: R$
        {' '}
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { `${getTotalPrice().toFixed(2).replace('.', ',')}` }
        </span>
      </button>
    </section>
  );
};

export default ProductList;
