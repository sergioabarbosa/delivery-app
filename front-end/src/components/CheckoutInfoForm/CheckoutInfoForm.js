import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext, UserContext } from '../../context';
import { dataTestIds } from '../../helpers';
import './style.css';

const CheckoutInfoForm = () => {
  const { postSale } = useContext(ProductContext);
  const { users } = useContext(UserContext);
  const [sellerId, setSellerId] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (sellerId && deliveryAddress && deliveryNumber) return setDisabled(false);
    setDisabled(true);
  }, [sellerId, deliveryAddress, deliveryNumber]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const id = await postSale({ sellerId, deliveryAddress, deliveryNumber });
      navigate(`/customer/orders/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const renderSelectSellerInput = () => (
    <div className="input-container">
      <label htmlFor="seller-input">
        P. Vendedora Responsável
        <select
          id="seller-input"
          value={ sellerId }
          onChange={ ({ target: { value } }) => setSellerId(+value) }
          data-testid={ dataTestIds.checkout.formSeller }
        >
          <option value="0">Selecione</option>
          {
            users.filter(({ role }) => role === 'seller')
              .map(({ name, id }, index) => (
                <option
                  key={ `seller-${index + 1}` }
                  value={ id }
                >
                  { name }
                </option>
              ))
          }
        </select>
      </label>
    </div>
  );

  const renderInputDeliveryAddress = () => (
    <div className="input-container">
      <label htmlFor="delivery-address-input">
        Endereço
        <input
          type="text"
          id="delivery-address-input"
          className="delivery-address-input"
          value={ deliveryAddress }
          onChange={ ({ target: { value } }) => setDeliveryAddress(value) }
          placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
          data-testid={ dataTestIds.checkout.formAddress }
        />
      </label>
    </div>
  );

  const renderInputDeliveryNumber = () => (
    <div className="input-container">
      <label htmlFor="delivery-number-input">
        Número
        <input
          type="email"
          id="delivery-number-input"
          value={ deliveryNumber }
          onChange={ ({ target: { value } }) => setDeliveryNumber(value) }
          placeholder="198"
          data-testid={ dataTestIds.checkout.formNumber }
        />
      </label>
    </div>
  );

  return (
    <div className="checkout-info-container">
      <h3>Cadastrar novo usuário</h3>
      <div className="checkout-info-form-container">
        <form>
          <div className="checkout-form-up">
            { renderSelectSellerInput() }
            { renderInputDeliveryAddress() }
            { renderInputDeliveryNumber() }
          </div>
          <button
            type="submit"
            onClick={ (e) => handleSubmit(e) }
            disabled={ disabled }
            data-testid={ dataTestIds.checkout.formBtn }
          >
            FINALIZAR PEDIDO
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutInfoForm;
