import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addVaccine } from "../Api/vaccinesApi";
import { FaUsers } from "react-icons/fa";

const GlassCard = ({ children }) => (
  <div className="rounded-2xl p-5 bg-white/30 backdrop-blur-lg border border-white/20 shadow-md">
    {children}
  </div>
);

const AddVaccines = () => {
  const [form, setForm] = useState({
    name: "",
    disease: "",
    description: "",
    recommendedWeeks: "",
    gender: "All"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVaccine(form);
      alert("✅ Vaccine added successfully!");
      setForm({ name: "", disease: "", description: "", recommendedWeeks: "", gender: "All" });
    } catch (error) {
      console.error("Error adding vaccine:", error);
      alert("❌ Failed to add vaccine.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

         {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded transition"
        >
          ← Back
        </button>
       

      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md relative">

       
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          🧬 Add New Vaccine
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vaccine Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Eg: BCG"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Disease Prevented</label>
            <input
              type="text"
              name="disease"
              value={form.disease}
              onChange={handleChange}
              placeholder="Eg: Tuberculosis"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief details about the vaccine"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Weeks After Birth</label>
            <input
              type="number"
              name="recommendedWeeks"
              value={form.recommendedWeeks}
              onChange={handleChange}
              placeholder="Eg: 6"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            ➕ Add Vaccine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVaccines;
