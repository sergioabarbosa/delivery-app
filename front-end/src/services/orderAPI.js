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

const getByUser = async (id, role, token) => {
  const { data } = await axios.get(
    `${URL}sales/${role}/${id}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data;
};

const updateStatus = async (id, status, token) => {
  const { data } = await axios.patch(
    `${URL}sales/${id}`,
    { status },
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
  getByUser,
  updateStatus,
};
