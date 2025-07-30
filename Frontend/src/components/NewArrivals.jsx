import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getNewToy } from "../Api/toyApi";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNewToy()
      .then((res) => {
        console.log("API response:", res);
        if (res.success) {
          setProducts(res.data);
        } else {
          console.error("Failed to load toys:", res.message);
        }
      })
      .catch((err) => {
        console.error("Error loading new toys:", err);
      });
  }, []);

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl text-amber-950 font-semibold text-center mb-10">
          New Arrivals
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No new toys available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Show More Button */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-amber-950 font-semibold px-5 py-2 rounded-md flex items-center gap-2"
            onClick={() => navigate("/shop")}
          >
            SHOW MORE →
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
