import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllToy } from "../Api/toyApi";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import CartBtn from "../components/CartBtn";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");

    const navigate = useNavigate();
    
useEffect(() => {
  getAllToy()
    .then((data) => {
      setProducts(data);
      setDisplayedProducts(data);
    })
    .catch((err) => console.error("Error:", err));
}, []);


    useEffect(() => {
        let filtered = [...products];

        if (searchTerm) {
            filtered = filtered.filter((toy) =>
                toy.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (category !== "All") {
            filtered = filtered.filter((toy) => toy.toyCategory === category);
        }

        setDisplayedProducts(filtered);
    }, [searchTerm, category, products]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
            {/* Header */}
            <header className=" bg-white shadow-lg px-15 py-3  flex flex-wrap gap-6 justify-between items-center sticky top-0 z-20 rounded-b-md">
                <h1 className="text-3xl font-extrabold text-amber-900 tracking-wider">
                    ToyCycle
                </h1>

                {/* Search & Filter */}
                <div className="flex justify-center items-center gap-5">
                    <div className="flex items-center border-b  border-yellow-500  bg-white focus-within:ring-2 focus-within:ring-amber-400 transition">
                        <IoIosSearch className="text-gray-500 ml-2 text-xl" />
                        <input
                            type="text"
                            placeholder="Search toys..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-2 py-2 w-40 md:w-60 outline-none bg-transparent text-sm rounded-r"
                        />
                    </div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border-b border-yellow-500  px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white "
                    >
                        <option value="All">All Categories</option>
                        <option value="Educational">Educational</option>
                        <option value="Soft Toy">Soft Toy</option>
                        <option value="Indoor">Indoor</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Children Books">Children Books</option>
                        <option value="Remote Controlled">Remote Controlled</option>
                        <option value="Musical">Musical</option>
                        <option value="Vehicles">Vehicles</option>
                        <option value="DIY Kit">DIY Kit</option>
                        <option value="Other">Other</option>
                    </select>
                </div>


                {/* Navigation Icons */}
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

            {/* Go Back */}
            <div className="px-10 py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-amber-950 hover:text-amber-700 font-medium transition text-lg"
                >
                    <FaArrowLeft /> Go Back
                </button>
            </div>

            {/* Product Grid */}
            {displayedProducts.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-4 mt-4">
                    {displayedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shop;
