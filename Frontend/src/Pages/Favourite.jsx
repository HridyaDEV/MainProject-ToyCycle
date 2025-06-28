

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites } from "../Api/favApi";
import ProductCard from "../components/ProductCard"; 

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const favToys = await getFavorites(userId);
        setFavorites(favToys);
      } catch (error) {
        console.error("Failed to fetch favorites", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-amber-900 mb-6 text-center">Your Favorite Toys</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600 italic">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {favorites.map((toy) => (
            <ProductCard key={toy._id} product={toy} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;
