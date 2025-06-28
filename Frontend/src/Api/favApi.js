import axios from "axios";

const url = 'http://localhost:5115';

// ✅ Toggle favorite toy
export const toggleFavorite = async (toyId, userId) => {
  console.log("📤 Sending to toggleFavorite:", { toyId, userId }); // 👈 add this log
  return await axios.post(`http://localhost:5115/fav/toggle/${toyId}`, { userId });
};


// ✅ Get all favorites for a user
export const getFavorites = async (userId) => {
  const response = await axios.get(`${url}/fav/${userId}`);
  return response.data.favorites;
};
