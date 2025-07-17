import axios from 'axios';

export const getUserInfo = async () => {
  const token = localStorage.getItem('accessToken');
  return axios.get('/api/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
