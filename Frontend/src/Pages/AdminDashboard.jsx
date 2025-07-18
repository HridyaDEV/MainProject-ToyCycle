import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaSyringe,
  FaSignOutAlt,
  FaUserCog,
  FaClipboardList,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchDashboardCounts } from "../Api/dashboardApi";

const GlassCard = ({ children }) => (
  <div className="rounded-2xl p-5 bg-white/30 backdrop-blur-lg border border-white/20 shadow-md">
    {children}
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ users: 0, toys: 0, children: 0 });

  useEffect(() => {
    fetchDashboardCounts()
      .then((res) => {
        if (res.success) setCounts(res.data);
      })
      .catch((err) => console.error("Failed to fetch dashboard counts", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white/50 backdrop-blur-lg p-6 border-r border-white/30 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 cursor-pointer hover:text-indigo-600" onClick={() => navigate("/userview")}> 
            <FaUsers /> Manage Users
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:text-indigo-600" onClick={() => navigate("/toys")}> 
            <FaBoxOpen /> Manage Toys
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:text-indigo-600" onClick={() => navigate("/orders")}> 
            <FaClipboardList /> Manage Orders
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:text-indigo-600" onClick={() => navigate("/vaccination")}> 
            <FaSyringe /> Vaccinations
          </li>
          <li className="flex items-center gap-3 cursor-pointer text-red-600 mt-10" onClick={handleLogout}> 
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide mb-10">
          Admin Dashboard
        </h1>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <GlassCard>
            <div className="flex items-center gap-4">
              <FaUsers className="text-blue-600 text-3xl" />
              <div>
                <p className="text-sm text-gray-600">Users</p>
                <p className="text-2xl font-bold text-gray-800">{counts.users}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-4">
              <FaBoxOpen className="text-green-600 text-3xl" />
              <div>
                <p className="text-sm text-gray-600">Toys Listed</p>
                <p className="text-2xl font-bold text-gray-800">{counts.toys}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-4">
              <FaShoppingCart className="text-yellow-600 text-3xl" />
              <div>
                <p className="text-sm text-gray-600">Children</p>
                <p className="text-2xl font-bold text-gray-800">{counts.children}</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
