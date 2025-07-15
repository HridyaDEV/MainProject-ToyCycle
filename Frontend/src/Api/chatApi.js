
import axios from "axios";

export const getMessageList = async (token) => {
  const res = await axios.get("http://localhost:5115/chat/allchats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
