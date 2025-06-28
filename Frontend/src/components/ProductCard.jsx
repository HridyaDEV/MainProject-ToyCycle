import React, { useEffect, useState } from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Api/cartApi";
import { getFavorites, toggleFavorite } from "../Api/favApi";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const userId = localStorage.getItem("userId");

  // Fetch favorites on component mount
useEffect(() => {
  const fetchFavorites = async () => {
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      console.warn("No userId found in localStorage. Skipping favorites fetch.");
      return;
    }

    try {
      const favorites = await getFavorites(userId);
      const favIds = favorites.map((toy) => toy._id);
      setIsFavorite(favIds.includes(product._id));
    } catch (err) {
      console.error("Error fetching favorites", err);
    }
  };

  fetchFavorites();
}, [product._id]);


  // Handle heart icon click
  const handleToggleFavorite = async () => {
    if (!userId) {
      alert("Please login to use favorites.");
      navigate("/login");
      return;
    }

    try {
      await toggleFavorite(product._id, userId);
      setIsFavorite((prev) => !prev);
    } catch (err) {
      console.error("Toggle favorite failed", err);
    }
  };

  // Handle Know More button
  const handleKnowMore = () => {
    navigate(`/product/${product._id}`);
  };

  // Handle Add to Cart
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      await addToCart(product._id, token); // changed toy._id to product._id
      alert("Added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 relative">
      <img
        src={`http://localhost:5115${product.imageUrl}`}
        alt={product.title}
        className="w-full h-52 object-cover rounded-md"
      />
      <button
        onClick={handleToggleFavorite}
        className="absolute top-4 right-4 text-gray-600 bg-white rounded-full w-8 h-8 mr-1 mt-1 flex items-center justify-center"
      >
        {isFavorite ? (
          <BiSolidHeart className="w-6 h-6 text-red-500" />
        ) : (
          <BiHeart className="w-6 h-6" />
        )}
      </button>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mt-4">{product.title}</h2>
        <p className="text-lg font-bold mt-1">₹ {product.price}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className="text-sm text-gray-700 font-medium hover:text-amber-950"
          onClick={handleKnowMore}
        >
          Know More →
        </button>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded text-sm font-semibold"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
