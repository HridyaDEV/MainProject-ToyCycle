import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { addChild } from "../Api/childApi"; 

const AddChild = () => {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    gender: "Male",
  });

  const navigate = useNavigate();
  const parentId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addChild({ ...form, parentId }); // 🔹 using API helper
      toast.success("Child added successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Failed to add child.");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-amber-800 hover:text-amber-600 text-sm flex items-center"
      >
        <FaArrowLeft className="mr-2" /> Go Back
      </button>

      <div className="flex items-center justify-center h-full mt-12">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-amber-800 mb-2 text-center">Add Child</h2>
          <input
            type="text"
            name="name"
            placeholder="Child Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button
            type="submit"
            className="bg-amber-900 text-white px-4 py-2 rounded w-full hover:bg-amber-700"
          >
            Add Child
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChild;
