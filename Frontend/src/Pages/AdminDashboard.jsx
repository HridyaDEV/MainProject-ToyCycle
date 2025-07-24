import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaSyringe,
  FaChild,
} from "react-icons/fa";
import { fetchDashboardCounts } from "../Api/dashboardApi";
import SideBar from "../components/SideBar"; // adjust path if needed

const GlassCard = ({ children }) => (
  <div className="rounded-2xl p-5 bg-white/30 backdrop-blur-lg border border-white/20 shadow-md">
    {children}
  </div>
);

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    users: 0,
    toys: 0,
    children: 0,
    vaccine: 0,
  });

  useEffect(() => {
    fetchDashboardCounts()
      .then((res) => {
        if (res.success) setCounts(res.data);
      })
      .catch((err) => console.error("Failed to fetch dashboard counts", err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 p-10 ml-64">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide mb-10">
          Admin Dashboard
        </h1>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <GlassCard>
            <div className="flex items-center gap-4">
              <FaUsers className="text-blue-600 text-3xl" />
              <div>
                <p className="text-sm text-gray-600">Users</p>
                <p className="text-2xl font-bold text-gray-800">
                  {counts.users}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-4">
              <FaBoxOpen className="text-green-600 text-3xl" />
              <div>
                <p className="text-sm text-gray-600">Toys Listed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {counts.toys}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-4">
              <FaChild className="text-yellow-600 text-3xl" />
              <div>
                <p className="text-sm text-gray-600">Children</p>
                <p className="text-2xl font-bold text-gray-800">
                  {counts.children}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-4">
              <FaSyringe className="text-purple-600 text-3xl" />
              <div>
                <p className="text-sm text-gray-600">Vaccines</p>
                <p className="text-2xl font-bold text-gray-800">
                  {counts.vaccine}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
