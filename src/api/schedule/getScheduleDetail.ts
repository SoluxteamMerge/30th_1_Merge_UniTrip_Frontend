import axios from "axios";

export const getScheduleDetail = async (scheduleId: number, token: string) => {
  const response = await axios.get(`/api/schedules/${scheduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};