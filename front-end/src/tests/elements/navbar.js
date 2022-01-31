import { screen } from '@testing-library/react';
import dataTestIds from '../helpers/dataTestIds';

export default () => {
  const ordersBtn = screen.getByTestId(dataTestIds.navbar.common.navBtn);
  const name = screen.getByTestId(dataTestIds.navbar.common.navName);
  const logout = screen.getByTestId(dataTestIds.navbar.common.navLogout);
  return [ordersBtn, name, logout];
};
