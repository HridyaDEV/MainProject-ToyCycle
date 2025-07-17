import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaSyringe,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Reusable GlassCard
const GlassCard = ({ children, onClick }) => (
  <div
    onClick={onClick}
    className="rounded-2xl p-5 bg-white/30 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
  >
    {children}
  </div>
);

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 600 },
  { name: "Mar", sales: 800 },
  { name: "Apr", sales: 500 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <GlassCard>
          <div className="flex items-center gap-4">
            <FaUsers className="text-blue-600 text-3xl" />
            <div>
              <p className="text-sm text-gray-600">Users</p>
              <p className="text-2xl font-bold text-gray-800">1200</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-4">
            <FaBoxOpen className="text-green-600 text-3xl" />
            <div>
              <p className="text-sm text-gray-600">Toys Listed</p>
              <p className="text-2xl font-bold text-gray-800">320</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-4">
            <FaShoppingCart className="text-yellow-600 text-3xl" />
            <div>
              <p className="text-sm text-gray-600">Orders</p>
              <p className="text-2xl font-bold text-gray-800">480</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Chart + Summary section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Sales Chart */}
        <GlassCard>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Monthly Sales Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              barCategoryGap={30}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="#6b7280" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
                cursor={{ fill: "#f3f4f6" }}
              />
              <Bar
                dataKey="sales"
                fill="#6366f1"
                radius={[10, 10, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* System Summary Card */}
        <GlassCard>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            System Summary
          </h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex justify-between border-b pb-2">
              <span>New Users Today</span>
              <span className="font-semibold">24</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Pending Orders</span>
              <span className="font-semibold">19</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Low Inventory Items</span>
              <span className="font-semibold text-red-500">4</span>
            </li>
            <li className="flex justify-between">
              <span>Active Sessions</span>
              <span className="font-semibold">56</span>
            </li>
          </ul>
        </GlassCard>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <GlassCard onClick={() => navigate("/userview")}>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Manage Users
          </h3>
          <p className="text-sm text-gray-500">
            View and control user accounts
          </p>
        </GlassCard>

        <GlassCard onClick={() => navigate("/toys")}>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Manage Toys
          </h3>
          <p className="text-sm text-gray-500">
            Add, edit or delete toy listings
          </p>
        </GlassCard>

        <GlassCard onClick={() => navigate("/orders")}>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Manage Orders
          </h3>
          <p className="text-sm text-gray-500">
            Track and update customer orders
          </p>
        </GlassCard>

        <GlassCard onClick={() => navigate("/vaccination")}>
          <div className="flex items-center gap-2 mb-1">
            <FaSyringe className="text-pink-600 text-xl" />
            <h3 className="text-lg font-semibold text-gray-800">
              Add Vaccination
            </h3>
          </div>
          <p className="text-sm text-gray-500">
            Add or modify vaccination records
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
