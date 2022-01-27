import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userValidations from '../../services/userValidations';
import { userAPI } from '../../services';
import { UserContext } from '../../context';
import './style.css';

const FIVE_SECONDS = 5000;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [errorRegister, setErrorRegister] = useState(false);
  const { saveUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const user = await userAPI.register({ name, email, password });
      delete user.createdAt;
      delete user.updatedAt;
      saveUser(user);
      navigate('/customer/products');
    } catch (err) {
      console.log(err);
      setErrorRegister(true);
      setTimeout(() => {
        setErrorRegister(false);
      }, FIVE_SECONDS);
    }
  };

  useEffect(() => {
    const { error } = userValidations({ name, email, password });
    if (!error) setDisabled(false);
  }, [name, email, password]);

  const renderError = () => (
    <p
      data-testid="common_register__element-invalid_register"
    >
      Erro: Usuário já cadastrado
    </p>
  );

  return (
    <div className="box-form">
      <h1 className="titulo-cadastro">Cadastro</h1>
      <form method="POST" className="form-register">
        <label htmlFor="name">
          Name
          <input
            className="form-register-name"
            data-testid="common_register__input-name"
            value={ name }
            onChange={ (event) => setName(event.target.value) }
            type="text"
            placeholder="Name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            className="form-register-email"
            data-testid="common_register__input-email"
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
            type="email"
            placeholder="Email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            className="form-register-password"
            data-testid="common_register__input-password"
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
            type="password"
            placeholder="Senha"
          />
        </label>
        <button
          onClick={ handleClick }
          className="button-register"
          data-testid="common_register__button-register"
          type="submit"
          disabled={ disabled }
        >
          CADASTRAR
        </button>
        { errorRegister && renderError() }
      </form>
    </div>
  );
};

export default Register;
