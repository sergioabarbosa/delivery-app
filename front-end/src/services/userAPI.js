import axios from 'axios';

const baseURL = 'http://localhost:3001';

const register = async ({ name, email, password }) => {
  const { data } = await axios.post(`${baseURL}/users/register`, {
    name,
    email,
    password,
  });

  return data;
};

export default {
  register,
};
