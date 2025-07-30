import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllCategories } from "../Api/categoryApi";

const categoryImages = {
  Educational: "/educational.jpg",
  "Soft Toy": "/plushies.jpg",
  Puzzle: "/puzzles.jpg",
  Outdoor: "/outdoor.jpg",
  Indoor: "/indoor.jpg",
  Musical: "/musical.jpg",
  Vehicles: "/vehicles.jpg",
  Electrical: "/electrical.jpg",
  "Remote Controlled": "/remote.jpg",
  "DIY Kit": "/DIY.jpg",
  "Children Books": "/books.webp",
  Other: "/other.jpg",
};

const CategoryCardList = ({ showAll = false }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCategories();
      console.log("Fetched categories:", res);
      if (res.success) {
        const data = showAll ? res.data : res.data.slice(0, 4);
        setCategories(data);
      }
    };
    fetchData();
  }, [showAll]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-15">
        {categories.map((cat, idx) => (
          <Link to={`/category/${encodeURIComponent(cat)}`} key={idx}>
            <div className="bg-white rounded-xl shadow-md p-4 text-center h-90 cursor-pointer hover:shadow-lg transition">
              <div className="flex justify-center">
                <img
                  src={categoryImages[cat] || "/default.jpg"}
                  alt={cat}
                  className="w-[280px] h-70 object-cover rounded-md"
                />
              </div>
              <h3 className="mt-4 font-semibold text-lg text-gray-800">{cat}</h3>
            </div>
          </Link>
        ))}
      </div>

      {!showAll && (
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate("/categories")}
            className="bg-yellow-500 hover:bg-yellow-600 text-amber-950 font-semibold px-5 py-2 rounded-md flex items-center gap-2"
          >
            SHOW MORE →
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryCardList;
