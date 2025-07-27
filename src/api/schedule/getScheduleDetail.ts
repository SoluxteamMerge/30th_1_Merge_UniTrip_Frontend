import axios from "axios";

export const getScheduleDetail = async (scheduleId: number) => {
  const response = await axios.get(`/api/schedules/${scheduleId}`);
  return response.data;
};
