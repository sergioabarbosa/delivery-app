import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { userLocalStorage, userAPI } from '../../services';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const data = await userAPI.getAll(token);
          setUsers(data);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [token, setUsers]);

  const saveUser = async (loggedUser) => {
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
