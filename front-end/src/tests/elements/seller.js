import { screen } from '@testing-library/react';
import dataTestIds from '../helpers/dataTestIds';

export default () => {
  const orderNumber = screen.getByTestId(`${dataTestIds.sellerOrders.orderCardId}1`);

  return [orderNumber];
};
