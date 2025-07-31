import axios from "axios";

export const getScheduleList = async (userId: number, token: string, page = 0, size = 100) => {
  const response = await axios.get(`/api/schedules?userId=${userId}&page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};