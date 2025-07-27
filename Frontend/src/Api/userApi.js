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

export const getAllUsers = async() => {
  const response = await axios.get(`${url}/user/all-users`)
  return response.data
}

export const getUserById = async (id) => {
  try {
const response = await axios.get(`${url}/user/admin/user/${id}`);
    return response.data;
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
};

export const deleteUserById = async (id) => {
  try {
    const response = await axios.delete(`${url}/user/admin/user/${id}`);
    return response.data;
  } catch (err) {
    console.error("Delete API error:", err);
    throw err;
  }
};

export const updateUserProfile = async (token, updateData) => {
  const res = await fetch(`${url}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update user profile");
  }

  return await res.json();
};


