import React, { useContext, useEffect } from 'react';
import { userAPI } from '../../services';
import { UserContext } from '../../context';
import { dataTestIds, userHelper } from '../../helpers';
import './style.css';

const UserDetailTable = () => {
  const { users, token, setUsers } = useContext(UserContext);

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

  const handleClickDelete = async (id) => {
    try {
      userAPI.remove(id, token);
      const newUsers = users.filter((user) => user.id !== id);
      setUsers(newUsers);
    } catch (e) {
      console.log(e);
    }
  };

  const renderTableHead = () => (
    <thead>
      <tr>
        <th>Item</th>
        <th>Nome</th>
        <th>Email</th>
        <th>Tipo</th>
        <th>Ecluir</th>
      </tr>
    </thead>
  );

  return (
    <div className="users-list-container">
      <h3>Lista de usuários</h3>
      <div className="table-container">
        <table>
          { renderTableHead() }
          <tbody>
            { users.map(({ id, name, email, role }, index) => (
              <tr className="users-row" key={ `user-${index}` }>
                <td data-testid={ `${dataTestIds.item}${index}` }>{ id }</td>
                <td data-testid={ `${dataTestIds.name}${index}` }>{ name }</td>
                <td data-testid={ `${dataTestIds.email}${index}` }>{ email }</td>
                <td
                  data-testid={ `${dataTestIds.role}${index}` }
                >
                  { userHelper.setRoleText(role) }
                </td>
                <td data-testid={ `${dataTestIds.remove}${index}` }>
                  <button
                    type="button"
                    onClick={ () => handleClickDelete(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetailTable;
