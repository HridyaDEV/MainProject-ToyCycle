import axios from "axios";

const url = "http://localhost:5115"

export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${url}/category`);
    return res.data; // { success: true, data: [...] }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, data: [] };
  }
};




