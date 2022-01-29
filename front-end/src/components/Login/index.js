import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context';
import { userAPI, validate, userLocalStorage } from '../../services';
import deliveryPhoto from '../../images/delivery.png';
import './style.css';

const FIVE_SECONDS = 5000;

const Login = () => {
  const navigate = useNavigate();
  const { saveUser } = useContext(UserContext);

  useEffect(() => {
    const user = userLocalStorage.get();
    if (user && user.role === 'customer') return navigate('/customer/products');
    if (user && user.role === 'seller') return navigate('/seller/orders');
    if (user && user.role === 'administrator') return navigate('/admin/manage');
  }, [navigate]);

  const data = {
    email: '',
    password: '',
  };

  const [user, setUser] = useState(data);
  const [buttonLogin, setButtonLogin] = useState(true);
  const [loginError, setLoginError] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const loggedUser = await userAPI.login(user);
      saveUser(loggedUser);
      if (loggedUser.role === 'customer') return navigate('/customer/products');
      if (loggedUser.role === 'seller') return navigate('/seller/orders');
      if (loggedUser.role === 'administrator') return navigate('/admin/manage');
    } catch (e) {
      console.log(e);
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, FIVE_SECONDS);
    }
  };

  useEffect(() => {
    const { error } = validate.login(user);
    if (!error) setButtonLogin(false);
  }, [user]);

  const renderError = () => (
    <p
      data-testid="common_login__element-invalid-email"
    >
      Erro: Usuário não cadastrado
    </p>
  );

  return (
    <div className="login">
      <div className="logoImg">
        <img className="imgSize" src={ deliveryPhoto } alt="logo" />
      </div>
      <div className="titleLogin">
        <h1>Nome do app</h1>
      </div>
      <div className="divavo">
        <div className="divpai">
          <div className="spanEmail">
            <span>Login</span>
            <input
              className="inputLogin"
              data-testid="common_login__input-email"
              name="email"
              value={ user.email }
              onChange={ handleChange }
              placeholder="Digite seu email"
            />
            <span>Senha</span>
            <input
              className="inputPassword"
              data-testid="common_login__input-password"
              name="password"
              type="password"
              onChange={ handleChange }
              value={ user.password }
              placeholder="Digite sua senha"
            />
          </div>
        </div>
        <div className="buttonsLogin">
          <button
            id="buttonId"
            className="buttonOne"
            type="button"
            data-testid="common_login__button-login"
            disabled={ buttonLogin }
            onClick={ handleLogin }
          >
            Login
          </button>
          <button
            className="buttonTwo"
            type="button"
            onClick={ () => navigate('/register') }
            data-testid="common_login__button-register"
          >
            Ainda não tenho conta
          </button>
          { loginError && renderError() }
        </div>
      </div>
    </div>
  );
};

export default Login;
