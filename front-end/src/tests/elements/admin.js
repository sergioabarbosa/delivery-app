import { screen } from '@testing-library/react';
import dataTestIds from '../helpers/dataTestIds';

export default () => {
  const userIndex = screen.getByTestId(`${dataTestIds.manageUsers.item}1`);
  const userName = screen.getByTestId(`${dataTestIds.manageUsers.name}1`);

  return [userIndex, userName];
};
