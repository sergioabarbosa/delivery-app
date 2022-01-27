import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');

  const userContextValue = {
    users,
    token,
    setUsers,
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
