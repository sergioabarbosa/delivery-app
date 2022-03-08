import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { dataTestIds } from '../helpers';
import { getFormElements } from '../elements';

const createNewUser = () => {
  const [name, email, password, role, button] = getFormElements();

  userEvent.type(name, 'Novo Usuário Test');
  userEvent.type(email, 'usuário@email.com');
  userEvent.type(password, '123456');
  userEvent.selectOptions(role, 'customer');
  userEvent.click(button);
};

const removeUser = () => {
  const removeButton = screen.getByTestId(`${dataTestIds.manageUsers.remove}3`);
  userEvent.click(removeButton);
};

export default {
  createNewUser,
  removeUser,
};
