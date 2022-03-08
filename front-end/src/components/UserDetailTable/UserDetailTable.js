import React, { useContext } from 'react';
import { userAPI } from '../../services';
import { UserContext } from '../../context';
import { dataTestIds } from '../../helpers';
import './style.css';

const UserDetailTable = () => {
  const { users, token, setUsers } = useContext(UserContext);

  const handleClickDelete = async (id) => {
    try {
      await userAPI.remove(id, token);
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
            { users.filter(({ role }) => role !== 'administrator')
              .map(({ id, name, email, role }, index) => (
                <tr className="users-row" key={ `user-${index + 1}` }>
                  <td
                    data-testid={ `${dataTestIds.user.item}${index + 1}` }
                  >
                    { index + 1 }
                  </td>
                  <td data-testid={ `${dataTestIds.user.name}${index + 1}` }>{ name }</td>
                  <td
                    data-testid={
                      `${dataTestIds.user.email}${index + 1}`
                    }
                  >
                    { email }
                  </td>
                  <td
                    data-testid={ `${dataTestIds.user.role}${index + 1}` }
                  >
                    { role === 'customer' ? 'Cliente' : 'P. Vendedora' }
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={ () => handleClickDelete(id) }
                      data-testid={ `${dataTestIds.user.remove}${index + 1}` }
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
