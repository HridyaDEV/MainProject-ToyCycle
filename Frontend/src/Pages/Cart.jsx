import React, { useEffect, useState } from "react";
import { getCartItems, removeFromCart } from "../Api/cartApi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchCart = async () => {
      try {
        const data = await getCartItems(token);
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCart();
  }, [token, navigate]);

  const handleRemove = async (toyId) => {
    try {
      await removeFromCart(toyId, token);
      setItems((prev) => prev.filter((item) => item._id !== toyId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-amber-900 mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-6 items-center bg-white p-4 shadow-md rounded-lg"
              >
                <img
                  src={`http://localhost:5115${item.imageUrl}`}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-yellow-700 font-medium mt-1">₹ {item.price}</p>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
              Total: ₹ {total}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/shop")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => alert("Proceeding to checkout...")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded shadow"
              >
                Proceed to Buy
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
