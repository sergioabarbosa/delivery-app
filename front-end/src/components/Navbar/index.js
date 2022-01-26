import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { userLocalStorage } from '../../services';
import './style.css';

const handleClickFirstButton = (role, navigate) => {
  if (role === 'customer') {
    navigate('/customer/products');
  }
  if (role === 'seller') {
    navigate('/seller/orders');
  }
  if (role === 'administrator') {
    navigate('/admin/manage');
  }
};

const setFirstButtonText = (role) => {
  if (role === 'customer') return 'PRODUTOS';
  if (role === 'seller') return 'PEDIDOS';
  if (role === 'administrator') return 'GERENCIAR USUÁRIOS';
};

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [user] = useState(userLocalStorage.get());
  const [buttonSelected, setButtonSelected] = useState(true);
  const { role } = user;

  useEffect(() => {
    if (pathname === '/customer/orders') return setButtonSelected(false);
    setButtonSelected(true);
  }, [pathname]);

  const handleClickExitButton = () => {
    navigate('/login');
    userLocalStorage.clear();
  };

  const renderSecondButton = () => (
    <button
      className={ `nav-button${!buttonSelected ? '-selected' : ''}` }
      type="button"
      onClick={ () => navigate('/customer/orders') }
    >
      MEUS PEDIDOS
    </button>
  );

  return (
    <header className="navbar">
      <div className="navbar-1">
        <button
          className={ `nav-button${buttonSelected ? '-selected' : ''}` }
          type="button"
          onClick={ () => handleClickFirstButton(role, navigate) }
        >
          { setFirstButtonText(role) }
        </button>
        { role === 'customer' && renderSecondButton() }
      </div>
      <div className="navbar-2">
        <div className="navbar-name">{ user.name }</div>
        <button
          type="button"
          onClick={ handleClickExitButton }
        >
          Sair
        </button>
      </div>
    </header>
  );
};

export default Navbar;
