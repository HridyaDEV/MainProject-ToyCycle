import React, { useState } from 'react';
import { sellToy } from '../Api/toyApi';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfileBtn from '../components/ProfileBtn';

const Sell = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    ageCategory: '',
    toyCategory: '',
    condition: '',
    material: "",
    color: "",
    weight: "",
    dimensionsLength: '',
    dimensionsWidth: '',
    isBatteryOperated: 'false', // default to false
    batteryType: '',
    image: null,
    quantity: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Login first to sell.");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      const data = await sellToy(form, token);
      toast.success("Product listed successfully!");
      setFormData({
        title: '', price: '', description: '', ageCategory: '',
        toyCategory: '', condition: '', material: '', color: '',
        weight: '', dimensionsLength: '', dimensionsWidth: '',
        dimensionsHeight: '', isBatteryOperated: 'false', batteryType: '', image: null
      });
      document.querySelector('input[type="file"]').value = "";
    } catch (err) {
      toast.error("Error uploading toy: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md px-10 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-3xl font-extrabold text-amber-900 tracking-wide">ToyCycle</h1>
        <ProfileBtn />
      </header>

      {/* Back Button */}
      <div className="px-10 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-amber-950 hover:text-amber-700 transition duration-200 text-lg"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>

      {/* Sell Form */}
      <main className="flex items-center justify-center px-6 pb-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-4xl border border-amber-200"
        >
          <h2 className="text-4xl font-bold text-amber-950 mb-10 text-center">
            Sell Your Toy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required
                className="w-full border border-gray-300 p-3 rounded-lg" />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required
                className="w-full border border-gray-300 p-3 rounded-lg" />
            </div>

            {/* Age Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Category</label>
              <select name="ageCategory" value={formData.ageCategory} onChange={handleChange} required
                className="w-full border border-gray-300 p-3 rounded-lg">
                <option value="">Select Age Range</option>
                <option value="0-6">0–6 months</option>
                <option value="6-12">6–12 months</option>
                <option value="1-2">1–2 years</option>
                <option value="2-3">2–3 years</option>
                <option value="3-5">3–5 years</option>
                <option value="6-8">6-8 years</option>
                <option value="9-12">9–12 years</option>
                <option value="12+">12+ years</option>
              </select>
            </div>

            {/* Toy Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Toy Category</label>
              <select name="toyCategory" value={formData.toyCategory} onChange={handleChange} required
                className="w-full border border-gray-300 p-3 rounded-lg">
                <option value="">Select Toy Category</option>
                <option value="Educational">Educational</option>
                <option value="Soft Toy">Soft Toy</option>
                <option value="Indoor">Indoor</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Children Books">Children Books</option>
                <option value="Remote Controlled">Remote Controlled</option>
                <option value="Musical">Musical</option>
                <option value="Vehicles">Vehicles</option>
                <option value="DIY Kit">DIY Kit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
              <select name="condition" value={formData.condition} onChange={handleChange} required
                className="w-full border border-gray-300 p-3 rounded-lg">
                <option value="">Select Condition</option>
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Gently Used">Gently Used</option>
                <option value="Used">Used</option>
                <option value="Needs Repair">Needs Repair</option>
              </select>
            </div>

            {/* Material */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
              <select name="material" value={formData.material} onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg">
                <option value="">Select Material</option>
                <option value="Plastic">Plastic</option>
                <option value="Wood">Wood</option>
                <option value="Metal">Metal</option>
                <option value="Fabric">Fabric</option>
                <option value="Mixed">Mixed</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input type="text" name="color" value={formData.color} onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg" />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (grams)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg" />
            </div>
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                min={1}
                value={formData.quantity || ''} 
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg"
                placeholder="Number of items"
              />
            </div>


            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (cm)</label>
              <div className="flex gap-2">
                <input type="number" name="dimensionsLength" placeholder="Length"
                  value={formData.dimensionsLength} onChange={handleChange}
                  className="w-1/3 border border-gray-300 p-2 rounded-lg" />
                <input type="number" name="dimensionsWidth" placeholder="Width"
                  value={formData.dimensionsWidth} onChange={handleChange}
                  className="w-1/3 border border-gray-300 p-2 rounded-lg" />
                <input type="number" name="dimensionsHeight" placeholder="Height"
                  value={formData.dimensionsHeight} onChange={handleChange}
                  className="w-1/3 border border-gray-300 p-2 rounded-lg" />
              </div>
            </div>
            {/* Battery Operated */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Battery Operated</label>
              <select
                name="isBatteryOperated"
                value={formData.isBatteryOperated}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            {/* Battery Type */}
            {formData.isBatteryOperated === 'true' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Battery Type</label>
                <input
                  type="text"
                  name="batteryType"
                  placeholder="e.g., AA, AAA, Rechargeable"
                  value={formData.batteryType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
              </div>
            )}


            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
              <input type="file" name="image" accept="image/*" onChange={handleChange} required
                className="w-full border border-gray-300 p-2 rounded-lg" />
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required
              className="w-full border border-gray-300 p-3 rounded-lg"
              placeholder="Describe the toy's features, condition, and any special info...">
            </textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-10 text-center">
            <button type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-12 rounded-xl shadow-lg transition duration-300">
              List Toy for Sale
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Sell;
