import axios from 'axios';

const baseURL = 'http://localhost:3001';

const create = async (token, product) => {
  const { data } = await axios.post(
    `${baseURL}/products`,
    { ...product },
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data;
};

const getAll = async (token) => {
  const { data: products } = await axios.get(
    `${baseURL}/products`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return products;
};

const remove = async (id, token) => {
  const { data: response } = await axios.delete(
    `${baseURL}/products/${id}`,
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
  create,
};
