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

const create = async (token, user) => {
  const { data } = await axios.post(
    `${baseURL}/users`,
    { ...user },
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data;
};

const getAll = async (token) => {
  const { data: users } = await axios.get(
    `${baseURL}/users`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return users;
};

const remove = async (id, token) => {
  const { data: response } = await axios.delete(
    `${baseURL}/users/${id}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return response;
};

export default {
  register,
  getAll,
  remove,
  create,
};
