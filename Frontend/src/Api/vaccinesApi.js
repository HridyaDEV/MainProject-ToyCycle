import axios from "axios";

 const url = "http://localhost:5115";

export const addVaccine = async (formData) => {
  const response = await axios.post(`${url}/vaccine/add`, formData);
  return response.data;
};

export const getAllVaccine = async () => {
  try {
    const response = await axios.get(`${url}/vaccine/all`)
    return response.data;
  } catch (error) {
    console.error("Error fetching vaccine:", error);
    throw error;
  }
};