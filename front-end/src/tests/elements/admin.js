import { screen } from '@testing-library/react';
import dataTestIds from '../helpers/dataTestIds';

export const getFormElements = () => ([
  screen.getByTestId(dataTestIds.manageUsers.formName),
  screen.getByTestId(dataTestIds.manageUsers.formEmail),
  screen.getByTestId(dataTestIds.manageUsers.formPassword),
  screen.getByTestId(dataTestIds.manageUsers.formRole),
  screen.getByTestId(dataTestIds.manageUsers.formBtn),
]);

export const getUserRowElements = (index) => ([
  screen.getByTestId(`${dataTestIds.manageUsers.item}${index}`),
  screen.getByTestId(`${dataTestIds.manageUsers.name}${index}`),
  screen.getByTestId(`${dataTestIds.manageUsers.email}${index}`),
  screen.getByTestId(`${dataTestIds.manageUsers.role}${index}`),
  screen.getByTestId(`${dataTestIds.manageUsers.remove}${index}`),
]);

const getAllUserRows = (quantity) => {
  let userRowsElements = [];
  for (let i = 1; i <= quantity; i += 1) {
    userRowsElements = [...userRowsElements.concat(getUserRowElements(i))];
  }
  return userRowsElements;
};

export default (userQuantity) => ([
  ...getFormElements(),
  ...getAllUserRows(userQuantity),
]);
