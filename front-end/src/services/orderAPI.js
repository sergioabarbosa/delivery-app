import axios from 'axios';

const URL = 'http://localhost:3001/';

const getAll = async (token) => {
  const { data } = await axios.get(
    `${URL}sales`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data;
};

const post = async (sale, token) => {
  const { data } = await axios.post(
    `${URL}sales`,
    { ...sale },
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data;
};

export default {
  getAll,
  post,
};
