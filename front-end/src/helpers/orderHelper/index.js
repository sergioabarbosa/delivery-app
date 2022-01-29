const NUMBER_TEN = 10;
const NUMBER_FOUR = 4;

const formateDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate() < NUMBER_TEN ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < NUMBER_TEN
    ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${day}/${month}/${date.getFullYear()}`;
};

const getOrderNumber = (orderId) => {
  let orderIdString = orderId.toString();
  while (orderIdString.length < NUMBER_FOUR) {
    orderIdString = `0${orderIdString}`;
  }
  return orderIdString;
};

export default {
  formateDate,
  getOrderNumber,
};
