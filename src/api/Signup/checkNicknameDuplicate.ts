import axios from 'axios';

export const checkNicknameDuplicate = async (nickname: string) => {
  const token = localStorage.getItem('accessToken');

  return axios.get('/api/user/check', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { nickname },
  });
};
