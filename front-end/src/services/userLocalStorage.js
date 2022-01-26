const get = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

const clear = () => {
  localStorage.removeItem('user');
};

export default {
  get,
  clear,
};
