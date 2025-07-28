import axios from "axios";

export const getScheduleList = async (page = 0, size = 100) => {
  const response = await axios.get(`/api/schedules?page=${page}&size=${size}`);
  return response.data;
};
