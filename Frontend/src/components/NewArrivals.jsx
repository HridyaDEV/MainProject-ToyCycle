import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getNewToy } from "../Api/toyApi";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

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
    <div className="min-h-screen bg-white ">
      <h1 className="text-3xl text-amber-950 font-semibold text-center mb-10">New Arrivals</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No new toys available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
