import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getToyDetails } from '../Api/toyApi';
import { FaArrowLeft } from 'react-icons/fa';
import { BsFillCartFill } from 'react-icons/bs';
import { addToCart } from '../Api/cartApi';
import CartBtn from '../components/CartBtn';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toy, setToy] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchToy = async () => {
      try {
        const res = await getToyDetails(id);
        setToy(res.data);
      } catch (error) {
        console.error("Error fetching toy:", error);
      }
    };
    fetchToy();
  }, [id]);

  if (!toy) {
    return (
      <p className="p-6 text-center text-gray-500 text-lg">Loading...</p>
    );
  }

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      await addToCart(toy._id, token);
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleChatWithSeller = () => {
     console.log("Logged-in user:", loggedInUser);
  console.log("Toy:", toy);

    if (!loggedInUser || !toy || !toy.sellerId) {
      toast.error("Missing user or toy information");
      return;
    }

    const sellerId = toy.sellerId._id || toy.sellerId; // works for both object or ID
    const roomId = [loggedInUser._id, sellerId].sort().join("_");
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-3xl font-extrabold text-amber-900 tracking-wide">ToyCycle</h1>
        <div className="flex items-center gap-6">
          <h1
            onClick={() => navigate("/favs")}
            className="text-amber-950 font-medium text-sm cursor-pointer hover:underline transition"
          >
            Your Favourites
          </h1>
          <CartBtn />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-amber-950 hover:text-amber-700 text-lg font-medium transition"
          >
            <FaArrowLeft className="mr-2" /> Back to Shop
          </button>
        </div>

        {/* Product Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={`http://localhost:5115${toy.imageUrl}`}
              alt={toy.title}
              className="rounded-xl object-cover w-full h-[400px] sm:h-[500px]"
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-amber-950 mb-2">{toy.title}</h2>
              <p className="text-gray-700 text-base mb-6">{toy.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-800">
                <p><span className="font-semibold">Age Category:</span> {toy.ageCategory}</p>
                <p><span className="font-semibold">Toy Category:</span> {toy.toyCategory}</p>
                <p><span className="font-semibold">Condition:</span> {toy.condition}</p>
                {toy.material && <p><span className="font-semibold">Material:</span> {toy.material}</p>}
                {toy.color && <p><span className="font-semibold">Color:</span> {toy.color}</p>}
                {toy.weight && <p><span className="font-semibold">Weight:</span> {toy.weight} g</p>}
                {toy.dimensions?.length && (
                  <p>
                    <span className="font-semibold">Dimensions:</span>{" "}
                    {toy.dimensions.length} x {toy.dimensions.width} x {toy.dimensions.height} cm
                  </p>
                )}
                <p>
                  <span className="font-semibold">Battery Operated:</span>{" "}
                  {toy.isBatteryOperated ? "Yes" : "No"}
                </p>
                {toy.isBatteryOperated && toy.batteryType && (
                  <p>
                    <span className="font-semibold">Battery Type:</span> {toy.batteryType}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-2xl text-amber-950 font-semibold mb-4">
                <span className='font-semibold '>Price:-</span> ₹{toy.price}
              </p>
              <div className='flex items-center gap-10'>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300 w-full sm:w-auto"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>

                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300 w-full sm:w-auto"
                  onClick={handleChatWithSeller}
                >
                  Chat with Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
