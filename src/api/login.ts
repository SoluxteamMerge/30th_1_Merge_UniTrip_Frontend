import axios from 'axios';

export const getGoogleLogin = async () => {
  try {
    const response = await axios.get('/api/google/login', {
      withCredentials: true,
    });

    if (response.data.code === 200) {
      const { accessToken, userName, userEmail } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail', userEmail);
      return {
        success: true,
        message: response.data.message, 
        userName,
        userEmail,
      };
    } else {
      return {
        success: false,
        message: response.data.message, 
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      return { success: false, message: error.response.data.message };
    } else {
      return { success: false, message: '로그인 요청 실패' };
    }
  }
};
