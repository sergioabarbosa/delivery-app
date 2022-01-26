import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import userValidations from '../../services/userValidations';
import 'react-toastify/dist/ReactToastify.css';
import userAPI from '../../services/userAPI';
import './style.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await userAPI.register({ name, email, password });
    } catch (err) {
      toast('Não foi possível cadastrar!');
    }
  };

  useEffect(() => {
    const { error } = userValidations({ name, email, password });
    console.log(error);
    if (!error) setDisabled(false);
  }, [name, email, password]);

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
        <ToastContainer
          data-testid="common_register__element-invalid_register"
          position="bottom-center"
          autoClose={ 5000 }
          hideProgressBar={ false }
          newestOnTop={ false }
          closeOnClick
          rtl={ false }
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </form>
    </div>
  );
};

export default Register;
