import axios from "axios";

const url = 'http://localhost:5115'

export const addChild = async (data) => {
  const res = await axios.post(`${url}/child/add`, data);
  return res.data;
};

export const updateChildById = async (token, childId, updateData) => {
  const res = await fetch(`${url}/child/${childId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update child");
  }

  return await res.json();
};