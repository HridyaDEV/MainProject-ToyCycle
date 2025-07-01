import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToysByCategory } from "../Api/toyApi";
import ProductCard from "../components/ProductCard";
import { FaArrowLeft } from "react-icons/fa";

const CategorySpecificPage = () => {
    const { categoryName } = useParams();
    const [toys, setToys] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchToys = async () => {
            const res = await getToysByCategory(categoryName);
            if (res.success) {
                setToys(res.data);
            }
        };
        fetchToys();
    }, [categoryName]);

    return (
        <>
            <header className=" bg-white shadow-lg px-15 py-3  flex flex-wrap gap-6 justify-between items-center sticky top-0 z-20 rounded-b-md">
                <h1 className="text-3xl font-extrabold text-amber-900 tracking-wider">
                    ToyCycle
                </h1>

            </header>
            {/* Back Button */}
            <div className="px-15 py-3 mt-2">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-amber-950 hover:text-amber-700 transition duration-200 text-lg"
                >
                    <FaArrowLeft className="mr-2" /> Go Back
                </button>
            </div>
           
            <h2 className="text-3xl font-semibold text-center text-amber-950 ">
                {decodeURIComponent(categoryName)} Toys
            </h2>

            {toys.length === 0 ? (
                <p>No toys found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-15 py-5">
                    {toys.map((toy) => (
                        <ProductCard key={toy._id} product={toy} />
                    ))}
                </div>
            )}
        </>

    );
};

export default CategorySpecificPage;
