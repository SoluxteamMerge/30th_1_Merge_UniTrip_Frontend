import axios from "axios";

export const deleteSchedule = async (scheduleId: number, token: string) => {
  const response = await axios.delete(`/api/schedules/${scheduleId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};
