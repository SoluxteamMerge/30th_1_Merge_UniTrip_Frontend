import axios, { AxiosError } from 'axios';

interface WithdrawResponse {
    code: number;
    message: string;
    data: null;
}

export const withdrawUser = async (token: string): Promise<WithdrawResponse> => {
    try {
        const response = await axios.delete('/api/user/signout', {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{ code: number; message: string; data: null }>;
        if (err.response && err.response.data) {
            throw err.response.data;
        } else {
            throw { message: '회원탈퇴 요청 실패' };
        }
    }
};
