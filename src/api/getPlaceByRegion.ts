import axios from "axios";

export const getPlaceByRegion = async (region: string, token: string) => {
  const response = await axios.get(`/api/place/filter?region=${region}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
