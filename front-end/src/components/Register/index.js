import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import userValidations from '../../services/userValidations';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleClick = async (e) => {
    e.preventDefault();
    toast('Não foi possível cadastrar!');
  };

  useEffect(() => {
    const { error } = userValidations({ name, email, password });
    console.log(error);
    if (!error) setDisabled(false);
  }, [name, email, password]);

  return (
    <div>
      <h1>Cadastro</h1>
      <form method="POST">
        <input
          data-testid="common_register__input-name"
          value={ name }
          onChange={ (event) => setName(event.target.value) }
          type="text"
          placeholder="Nome"
        />
        <input
          data-testid="common_register__input-email"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
          type="email"
          placeholder="Email"
        />
        <input
          data-testid="common_register__input-password"
          value={ password }
          onChange={ (event) => setPassword(event.target.value) }
          type="password"
          placeholder="Senha"
        />
        <button
          onClick={ handleClick }
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
