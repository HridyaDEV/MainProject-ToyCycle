import axios from "axios";

const url = 'http://localhost:5115'

export const sellToy = async (formData, token) => {
  try {
    const response = await axios.post(`${url}/toy/sell`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewToy = async () => {
  try {
    const response = await axios.get(`${url}/toy/new`)
    return response.data;
  } catch (error) {
    console.error("Error fetching new toys:", error);
    throw error;
  }
};

export const getAllToy = async () => {
  const token = localStorage.getItem("token"); // or sessionStorage or your context

  try {
    const response = await axios.get(`${url}/toy/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching  toys:", error);
    throw error;
  }
};

// get toys sell by user
export const getMyToys = async (token) => {
  const res = await axios.get(`${url}/toy/mytoys`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const getToyDetails =  async (id) => {
    try {
        const res = await axios.get(`${url}/toy/${id}`)
        return res.data
    } catch (error) {
        console.error("Error fetching  toys:", error);
        throw error; 
    }
}

export const getToysByCategory = async (category) => {
  try {
    const res = await axios.get(`${url}/toy/category/${category}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching toys by category:", error);
    return { success: false, data: [] };
  }
};

export const deleteToyById = async (id, token) => {
  try {
    const res = await axios.delete(`${url}/toy/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting toy:", error);
    throw error;
  }
};
