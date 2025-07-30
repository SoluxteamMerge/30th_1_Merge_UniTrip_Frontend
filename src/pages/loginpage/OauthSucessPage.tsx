import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AlertModal from '../../components/AlertModal/AlertModal';
import api from '../../api/api';
import { AxiosError } from 'axios';

const OauthSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('accessToken', token);

      const checkUserProfile = async () => {
        try {
          const response = await api.get('/api/user/getProfile', {
            headers: { Authorization: `Bearer ${token}` },
          });

          const { isProfileRegistered } = response.data.result;

          if (isProfileRegistered) {
            navigate('/');
          } else {
            navigate('/signup'); // 프로필 등록 페이지로
          }
        } catch (error: unknown) {
          const axiosError = error as AxiosError<{ message: string }>;
          if (axiosError.response) {
            setModalMessage(
              axiosError.response.data?.message || '회원 정보 조회에 실패했습니다.'
            );
          } else {
            setModalMessage('알 수 없는 오류가 발생했습니다.');
          }
          setIsModalOpen(true);
        }
      };

      checkUserProfile();
    } else {
      setModalMessage('토큰이 없습니다. 다시 로그인해주세요.');
      setIsModalOpen(true);
    }
  }, [navigate, searchParams]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      navigate('/signup');
    }, 200);
  };

  return (
    <>
      <div>로그인 처리 중입니다...</div>
      {isModalOpen && <AlertModal message={modalMessage} onClose={handleCloseModal} />}
    </>
  );
};

export default OauthSuccessPage;
