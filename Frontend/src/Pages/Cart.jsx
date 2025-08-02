import React, { useEffect, useState } from "react";
import { getCartItems, removeFromCart } from "../Api/cartApi";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BsCartX } from "react-icons/bs";
import { createCheckoutSession } from "../Api/paymentApi";
import { jwtDecode } from "jwt-decode";


const Cart = () => {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getCartItems(token);

        // Filter out null or invalid entries
        const filteredData = data.filter(
          (item) => item && typeof item.price === "number" && item.imageUrl
        );

        setItems(filteredData);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCart();
  }, [token, navigate]);

  const decoded = token ? jwtDecode(token) : null;
const userId = decoded?.id;


  const handleRemove = async (toyId) => {
    try {
      await removeFromCart(toyId, token);
      setItems((prev) => prev.filter((item) => item._id !== toyId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const data = await createCheckoutSession(items,userId);
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout failed", error);
      alert("Something went wrong during checkout.");
    }
  };

  const total = items.reduce((acc, item) => {
    if (item && typeof item.price === "number") {
      return acc + item.price * (item.quantity || 1);
    }
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-white shadow-md px-15 py-5 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-3xl font-bold text-amber-900 tracking-wide">ToyCycle</h1>
      </header>

      <div className="px-15 py-5 mt-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-amber-950 hover:text-amber-700 text-base mb-6"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>

        <h1 className="flex justify-center text-3xl font-bold text-amber-900 mb-6">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 mt-20">
            <BsCartX size={48} className="mb-4" />
            <p className="text-xl">Your cart is empty.</p>
            <button
              onClick={() => navigate("/shop")}
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-2 rounded"
            >
              Browse Toys
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-12">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center bg-white p-4 shadow rounded-lg gap-6"
              >
                <img
                  src={`http://localhost:5115${item.imageUrl}`}
                  alt={item.title || "Toy Image"}
                  className="w-28 h-28 object-cover rounded-md"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-yellow-800 font-medium mt-1">₹ {item.price}</p>
                  {item.quantity && (
                    <>
                      <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-800 font-semibold">
                        Subtotal: ₹ {item.price * item.quantity}
                      </p>
                    </>
                  )}
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
                Total: ₹ {total}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/shop")}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded shadow"
                >
                  Proceed to Buy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
