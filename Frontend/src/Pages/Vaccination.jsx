import React, { useEffect, useState } from 'react';
import { FaPlus, FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAllVaccine } from '../Api/vaccinesApi';
import SideBar from '../components/SideBar';


const Vaccination = () => {
  const navigate = useNavigate();
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await getAllVaccine();
        console.log("Fetched vaccines:", response); 

        if (response.success && Array.isArray(response.data)) {
          setVaccines(response.data);
        } else {
          console.error("Vaccine fetch failed or returned non-array data");
        }
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      }
    };

    fetchVaccines();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <SideBar />

      <main className="flex-1 p-10 pl-72">
        <h2 className="text-3xl font-bold text-gray-800 mb-5 text-center">
          Vaccination Panel
        </h2>

        {/* Add Button */}
        <div className="mb-4 flex justify-end">
          <div  className="flex items-center gap-3 bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300"
               onClick={() => navigate("/addvaccine")}>
              <FaPlus className="text-blue-600" />
              <div>
                <p className=" font-semibold text-gray-700">Add Vaccine</p>
                <p className="text-sm text-gray-500">Add a new vaccine to the list</p>
              </div>
            
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Disease</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Recommended Weeks</th>
              </tr>
            </thead>
            <tbody>
              {vaccines && vaccines.length > 0 ? (
                vaccines.map((vaccine, index) => (
                  <tr key={vaccine._id} className="text-sm text-gray-800 hover:bg-gray-50">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{vaccine.name}</td>
                    <td className="px-4 py-2 border">{vaccine.disease}</td>
                    <td className="px-4 py-2 border">{vaccine.description}</td>
                    <td className="px-4 py-2 border">{vaccine.recommendedWeeks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    No vaccines found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Vaccination;
