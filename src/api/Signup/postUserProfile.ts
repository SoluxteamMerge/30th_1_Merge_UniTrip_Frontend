import axios from 'axios';

export const postUserProfile = async (data: {
  nickname: string;
  phoneNumber: string;
  userType: string;
  emailVerified: boolean;
  profileImageUrl: string;
}) => {
  const token = localStorage.getItem('accessToken');

  return axios.post('/api/user/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
