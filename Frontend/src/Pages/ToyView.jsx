import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getToyDetails } from "../Api/toyApi";
import SideBar from "../components/SideBar";

const ToyView = () => {
  const { id } = useParams();
  const [toy, setToy] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToy = async () => {
      try {
        const response = await getToyDetails(id);
          // ✅ Log the full response to see the structure
        console.log("Toy details response:", response);
        if (response.success) {
          setToy(response.data);
        } else {
          alert("Toy not found.");
        }
      } catch (error) {
        console.error("Failed to fetch toy details:", error);
      }
    };

    fetchToy();
  }, [id]);

  if (!toy) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />

      <div className="flex-1 p-10 ml-64">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-6">Toy Details</h1>

          {toy.imageUrl && (
            <img
              src={`http://localhost:5115/${toy.image}`}
              alt={toy.title}
              className="w-full h-64 object-cover mb-6 rounded-lg"
            />
          )}

          <div className="space-y-4 text-gray-800">
            <p><strong>Title:</strong> {toy.title}</p>
            <p><strong>Description:</strong> {toy.description}</p>
            <p><strong>Category:</strong> {toy.toyCategory}</p>
            <p><strong>Age Category:</strong> {toy.ageCategory}</p>
            <p><strong>Price:</strong> ₹{toy.price}</p>
            <p><strong>Quantity:</strong> {toy.quantity}</p>
            <p><strong>Condition:</strong> {toy.condition}</p>
            <p><strong>Dimensions:</strong> {toy.dimensions?.length} x {toy.dimensions?.width} x {toy.dimensions?.height} cm</p>
               <p><strong>Seller Name:</strong> {toy.sellerId?.userName}</p>
        <p><strong>Seller Email:</strong> {toy.sellerId?.email}</p>
            <p><strong>Posted On:</strong> {new Date(toy.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="mt-6">
            <button
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/toys")}
            >
              Back to All Toys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToyView;
