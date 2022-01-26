import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { userAPI, userLocalStorage } from '../../services';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const adminToken = userLocalStorage.get().token;
    setToken(adminToken);

    (async () => {
      try {
        const data = await userAPI.getAll(adminToken);
        setUsers(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const userContextValue = {
    users,
    token,
    setUsers,
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
