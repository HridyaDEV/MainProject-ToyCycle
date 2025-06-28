import axios from "axios";

const url = 'http://localhost:5115'

export const getUserProfile = async (token) => {
  const response = await axios.get(`${url}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};