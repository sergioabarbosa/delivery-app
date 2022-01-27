import React, { useContext, useState, useEffect } from 'react';
import { userAPI, validate } from '../../services';
import { UserContext } from '../../context';
import './style.css';

const FIVE_SECONDS = 5000;

const NewUserForm = () => {
  const { token, users, setUsers } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Cliente');
  const [role, setRole] = useState('customer');
  const [disabled, setDisabled] = useState(true);
  const [conflictError, setConflictError] = useState(false);

  useEffect(() => {
    const { error } = validate.adminCreate({ name, email, password, role });
    if (!error) return setDisabled(false);
    setDisabled(true);
  }, [name, email, password, type, role]);

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setType('Cliente');
  };

  const renderError = () => (
    <p
      data-testid="admin_manage__element-invalid-register"
    >
      Erro: Nome e/ou email já cadastrado
    </p>
  );

  const handleSelectChange = ({ target: { value } }) => {
    setType(value);
    if (value === 'Cliente') return setRole('customer');
    if (value === 'P. Vendedora') return setRole('seller');
    if (value === 'P. Administradora') return setRole('administrator');
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const user = await userAPI.create(token, { name, email, password, role });
      delete user.createdAt;
      delete user.updatedAt;
      setUsers([...users, user]);
      clearForm();
    } catch (e) {
      setConflictError(true);
      setTimeout(() => {
        setConflictError(false);
      }, FIVE_SECONDS);
      console.log(e);
      clearForm();
    }
  };

  const renderInputName = () => (
    <div className="input-container">
      <label htmlFor="name-input">
        Nome
        <input
          type="text"
          id="name-input"
          value={ name }
          onChange={ ({ target: { value } }) => setName(value) }
          placeholder="Nome e Sobrenome"
          data-testid="admin_manage__input-name"
        />
      </label>
    </div>
  );

  const renderEmailName = () => (
    <div className="input-container">
      <label htmlFor="email-input">
        Email
        <input
          type="email"
          id="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
          placeholder="seu-email@site.com.br"
          data-testid="admin_manage__input-email"
        />
      </label>
    </div>
  );

  const renderPasswordName = () => (
    <div className="input-container">
      <label htmlFor="password-input">
        Senha
        <input
          type="password"
          id="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
          placeholder="**********"
          data-testid="admin_manage__input-password"
        />
      </label>
    </div>
  );

  const renderSelectRoleInput = () => (
    <div className="input-container">
      <label htmlFor="role-input">
        Tipo
        <select
          id="role-input"
          value={ type }
          onChange={ (e) => handleSelectChange(e) }
          data-testid="admin_manage__select-role"
        >
          <option>Cliente</option>
          <option>P. Vendedora</option>
          <option>P. Administradora</option>
        </select>
      </label>
    </div>
  );

  return (
    <div className="new-user-container">
      <h3>Cadastrar novo usuário</h3>
      <div className="new-user-form-container">
        <form>
          { renderInputName() }
          { renderEmailName() }
          { renderPasswordName() }
          { renderSelectRoleInput() }
          <button
            type="submit"
            onClick={ (e) => handleSubmit(e) }
            disabled={ disabled }
            data-testid="admin_manage__button-register"
          >
            CADASTRAR
          </button>
        </form>
        { conflictError && renderError() }
      </div>
    </div>
  );
};

export default NewUserForm;
