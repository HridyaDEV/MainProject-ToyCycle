import axios from "axios";

 const url = "http://localhost:5115";

export const addVaccine = async (formData) => {
  const response = await axios.post(`${url}/vaccine/add`, formData);
  return response.data;
};
