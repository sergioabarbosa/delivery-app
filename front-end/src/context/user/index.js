import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { userLocalStorage } from '../../services';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  const saveUser = async (loggedUser) => {
    delete loggedUser.id;
    setUser(loggedUser);
    userLocalStorage.save(loggedUser);
  };

  const userContextValue = {
    users,
    token,
    user,
    setUsers,
    saveUser,
    setToken,
  };

  return (
    <UserContext.Provider value={ userContextValue }>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UserProvider;
