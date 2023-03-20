import axios from 'axios';
axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:3000/users';

const getUser = async () => {
  const response = await axios.get(`${baseUrl}/current`);
  return response.data;
};

const loginUser = async (idToken) => {
  const response = await axios({
    method: 'post',
    url: `${baseUrl}/login`,
    headers: { Authorization: `Bearer ${idToken}` },
  });
  return response.data;
};

const logoutUser = async () => {
  await axios.post(`${baseUrl}/logout`);
};

export default { getUser, loginUser, logoutUser };
