const get = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

const clear = () => {
  localStorage.removeItem('user');
};

const save = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export default {
  get,
  clear,
  save,
};
