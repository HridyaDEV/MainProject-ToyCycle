import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard"
import { getAllToy } from "../Api/toyApi";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllToy()
      .then((res) => {
        if (res.success) {
          setProducts(res.data);
        } else {
          console.error("Failed to fetch toys:", res.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="min-h-screen px-8 py-12 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-10">Shop All Products</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
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

export default Shop;
