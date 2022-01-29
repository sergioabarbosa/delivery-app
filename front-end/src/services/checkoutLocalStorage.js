const get = () => {
  const user = JSON.parse(localStorage.getItem('checkout'));
  return user;
};

const clear = () => {
  localStorage.removeItem('checkout');
};

const save = (checkout) => {
  localStorage.setItem('checkout', JSON.stringify(checkout));
};

export default {
  get,
  clear,
  save,
};
