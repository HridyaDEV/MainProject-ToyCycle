import React, { useEffect, useState } from "react";
import { getAllToy } from "../Api/toyApi";

const AdminToyView = () => {
    const [toys, setToys] = useState([]);

    useEffect(() => {
        const fetchToys = async () => {
            try {
                const response = await getAllToy();
                console.log("Fetched toys:", response);
                if (response.success) {
                    setToys(response.data);
                }
            } catch (error) {
                console.error("Error fetching toys:", error);
            }
        };

        fetchToys();
    }, []);

    return (
        <div className="p-6 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">All Toys</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Price (₹)</th>
                        <th className="px-4 py-2 border">Description</th>
                        <th className="px-4 py-2 border">Age Category</th>
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Dimensions (cm)</th>
                    </tr>
                </thead>
                <tbody>
                    {toys.map((toy) => (
                        <tr key={toy._id} className="text-sm text-gray-800 hover:bg-gray-50">
                            <td className="px-4 py-2 border">{toy.title}</td>
                            <td className="px-4 py-2 border">{toy.price}</td>
                            <td className="px-4 py-2 border">{toy.description}</td>
                            <td className="px-4 py-2 border">{toy.ageCategory}</td>
                            <td className="px-4 py-2 border">{toy.toyCategory}</td>
                            <td className="px-4 py-2 border">{toy.quantity}</td>

                            <td className="px-4 py-2 border">
                                {toy.dimensions?.length} x {toy.dimensions?.width} x {toy.dimensions?.height}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminToyView;
