import axios from "axios";

export const getScheduleList = async (userId: number, page = 0, size = 100) => {
  const response = await axios.get(`/api/schedules?userId=${userId}&page=${page}&size=${size}`);
  return response.data;
};
