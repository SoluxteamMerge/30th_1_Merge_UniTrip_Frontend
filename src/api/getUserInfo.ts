import api from './api';

export const getUserInfo = async () => {
  const token = localStorage.getItem('accessToken');
  return api.get('/api/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
