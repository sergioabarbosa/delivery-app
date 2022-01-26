import axios from 'axios';

const URL = 'http://localhost:3001/';

const getAll = async (token) => {
  const { data: users } = await axios.get(
    `${URL}users`,
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
    `${URL}users/${id}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return response;
};

export default {
  getAll,
  remove,
};
