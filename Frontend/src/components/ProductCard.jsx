import React, { useEffect, useState } from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Api/cartApi";
import { getFavorites, toggleFavorite } from "../Api/favApi";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;

      try {
        const favorites = await getFavorites(userId);
        const favIds = favorites.map((toy) => toy._id);
        setIsFavorite(favIds.includes(product._id));
      } catch (err) {
        console.error("Error fetching favorites", err);
      }
    };

    fetchFavorites();
  }, [product._id, userId]);

  const handleToggleFavorite = async () => {
    if (!userId) {
      toast.error("Please login to use favorites.");
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

  const handleKnowMore = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    const quantity = 1;
    try {
      await addToCart(product._id, quantity, token);
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error?.response?.data || error.message);
      toast.error("Something went wrong while adding to cart!");
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
        className="absolute top-4 right-4 text-gray-600 bg-white rounded-full w-8 h-8 flex items-center justify-center"
      >
        {isFavorite ? (
          <BiSolidHeart className="w-6 h-6 text-red-600" />
        ) : (
          <BiHeart className="w-6 h-6" />
        )}
      </button>

      <div className="flex justify-between items-center mt-4">
        <h2 className="text-lg text-amber-950 font-semibold">{product.title}</h2>
        <p className="text-lg font-bold">₹ {product.price}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className="text-sm text-gray-700 font-medium hover:text-amber-950 hover:underline"
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
