import React, { useEffect, useState } from "react";
import { getAllToy, deleteToyById } from "../Api/toyApi";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

const AdminToyView = () => {
  const [toys, setToys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToys = async () => {
      try {
        const response = await getAllToy();
        if (response.success) {
          setToys(response.data);
        }
      } catch (error) {
        console.error("Error fetching toys:", error);
      }
    };

    fetchToys();
  }, []);

  const handleView = (id) => {
    navigate(`/admin/toys/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/toys/edit/${id}`);
  };

  const handleDelete = async (id) => {
  const token = localStorage.getItem("token")
  if (window.confirm("Are you sure you want to delete this toy?")) {
    try {
      const response = await deleteToyById(id, token);
      if (response.success) {
        setToys((prevToys) => prevToys.filter((toy) => toy._id !== id));
        alert("Toy deleted successfully");
      } else {
        alert("Failed to delete toy");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred");
    }
  }
};


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <SideBar />

      <main className="flex-1 p-6 ml-64 overflow-x-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">All Toys</h2>

        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Price (₹)</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Age Category</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Dimensions (cm)</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {toys.map((toy) => (
              <tr key={toy._id} className="text-sm text-gray-800 hover:bg-gray-50">
                <td className="px-4 py-2 border">{toy.title}</td>
                <td className="px-4 py-2 border">{toy.price}</td>
                <td className="px-4 py-2 border">{toy.description}</td>
                <td className="px-4 py-2 border">{toy.ageCategory}</td>
                <td className="px-4 py-2 border">{toy.toyCategory}</td>
                <td className="px-4 py-2 border">{toy.quantity}</td>
                <td className="px-4 py-2 border">
                  {toy.dimensions?.length} x {toy.dimensions?.width} x {toy.dimensions?.height}
                </td>
                <td className="px-4 py-2 border space-x-2">
                    <div className="flex justify-center gap-3">

                   
                  <button
                    onClick={() => handleView(toy._id)}
                    className="text-white px-2 rounded  bg-blue-500 hover:bg-blue-400"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(toy._id)}
                    className= "text-white px-2 rounded  bg-yellow-500 hover:bg-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(toy._id)}
                    className= "text-white px-2 rounded  bg-red-500 hover:bg-red-400"
                  >
                    Delete
                  </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminToyView;
