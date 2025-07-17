import axios from "axios";

const BASE_URL = "http://localhost:5115";

// 1. Get all chat room messages between two users
export const getMessages = async (user1, user2, token) => {
  const res = await axios.get(`${BASE_URL}/chat/messages/${user1}/${user2}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 2. Get list of all chat rooms the user is part of
export const getMessageList = async (token) => {
  const res = await axios.get(`${BASE_URL}/chat/allchats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 3. Get information of a user by ID
export const getOtherUserInfo = async (roomId, token) => {
  const res = await axios.get(`${BASE_URL}/chat/other-user/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
