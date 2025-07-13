import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaRupeeSign, FaSyringe, FaSignOutAlt, } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Reusable Card and Content
const Card = ({ children, className, onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-xl bg-white border hover:shadow-md transition duration-200 cursor-pointer ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-5 ${className}`}>{children}</div>
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
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <Card>
          <CardContent className="flex items-center gap-4">
            <FaUsers className="text-indigo-600 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Users</p>
              <p className="text-xl font-medium text-gray-800">1200</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <FaBoxOpen className="text-green-600 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Toys Listed</p>
              <p className="text-xl font-medium text-gray-800">320</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <FaShoppingCart className="text-yellow-600 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Orders</p>
              <p className="text-xl font-medium text-gray-800">480</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <FaRupeeSign className="text-red-600 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-xl font-medium text-gray-800">₹85,000</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Monthly Sales Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Section Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <Card onClick={() => navigate("/user")}>
          <CardContent>
            <h3 className="text-lg font-medium text-gray-800">Manage Users</h3>
            <p className="text-sm text-gray-500">View and edit user accounts</p>
          </CardContent>
        </Card>

        <Card onClick={() => navigate("/toys")}>
          <CardContent>
            <h3 className="text-lg font-medium text-gray-800">Manage Toys</h3>
            <p className="text-sm text-gray-500">Add, edit, or delete toy listings</p>
          </CardContent>
        </Card>

        <Card onClick={() => navigate("/orders")}>
          <CardContent>
            <h3 className="text-lg font-medium text-gray-800">Manage Orders</h3>
            <p className="text-sm text-gray-500">Track and update orders</p>
          </CardContent>
        </Card>

        <Card onClick={() => navigate("/payments")}>
          <CardContent>
            <h3 className="text-lg font-medium text-gray-800">Payments & Reports</h3>
            <p className="text-sm text-gray-500">View transaction history</p>
          </CardContent>
        </Card>

        <Card onClick={() => navigate("/vaccination")}>
          <CardContent>
            <div className="flex items-center gap-2 mb-1">
              <FaSyringe className="text-pink-600 text-xl" />
              <h3 className="text-lg font-medium text-gray-800">Add Vaccination</h3>
            </div>
            <p className="text-sm text-gray-500">Add or update vaccine info</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
