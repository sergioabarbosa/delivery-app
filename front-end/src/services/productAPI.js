import axios from 'axios';

const baseURL = 'http://localhost:3001';

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

export default {
  getAll,
};
