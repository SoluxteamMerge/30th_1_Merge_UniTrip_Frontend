import axios from 'axios';

export const toggleLike = async (postId: number, token: string) => {
  const response = await axios.post(`/api/likes/${postId}`, {}, {
    headers: { Authorization: token },
  });
  return response.data;  // { status, postId, liked, likeCount }
};
