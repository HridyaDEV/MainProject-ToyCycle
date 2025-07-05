import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaRupeeSign, FaSyringe, FaSignOutAlt } from "react-icons/fa";

const Card = ({ children, className }) => (
  <div className={`rounded-2xl shadow bg-white hover:shadow-lg transition ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 600 },
  { name: "Mar", sales: 800 },
  { name: "Apr", sales: 500 },
];

const AdminDashboard = () => {
  const handleLogout = () => {
    // Clear localStorage or authentication tokens
    localStorage.removeItem("token");
    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className="p-6 grid gap-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-100">
          <CardContent className="flex items-center gap-4">
            <FaUsers className="text-blue-700 text-2xl" />
            <div>
              <p className="text-sm text-gray-600">Users</p>
              <p className="text-xl font-semibold">1200</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-100">
          <CardContent className="flex items-center gap-4">
            <FaBoxOpen className="text-green-700 text-2xl" />
            <div>
              <p className="text-sm text-gray-600">Toys Listed</p>
              <p className="text-xl font-semibold">320</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-100">
          <CardContent className="flex items-center gap-4">
            <FaShoppingCart className="text-yellow-700 text-2xl" />
            <div>
              <p className="text-sm text-gray-600">Orders</p>
              <p className="text-xl font-semibold">480</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-100">
          <CardContent className="flex items-center gap-4">
            <FaRupeeSign className="text-red-700 text-2xl" />
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-xl font-semibold">₹85,000</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="col-span-full">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Monthly Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip />
              <Bar dataKey="sales" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Section Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="hover:bg-blue-50 cursor-pointer">
          <CardContent>
            <h3 className="text-lg font-medium">Manage Users</h3>
            <p className="text-sm text-gray-500">View and edit user accounts</p>
          </CardContent>
        </Card>
        <Card className="hover:bg-green-50 cursor-pointer">
          <CardContent>
            <h3 className="text-lg font-medium">Manage Toys</h3>
            <p className="text-sm text-gray-500">Add, edit, or delete toy listings</p>
          </CardContent>
        </Card>
        <Card className="hover:bg-yellow-50 cursor-pointer">
          <CardContent>
            <h3 className="text-lg font-medium">Manage Orders</h3>
            <p className="text-sm text-gray-500">Track and update orders</p>
          </CardContent>
        </Card>
        <Card className="hover:bg-purple-50 cursor-pointer">
          <CardContent>
            <h3 className="text-lg font-medium">Payments & Reports</h3>
            <p className="text-sm text-gray-500">View transaction history</p>
          </CardContent>
        </Card>
        <Card className="hover:bg-pink-50 cursor-pointer">
          <CardContent>
            <div className="flex items-center gap-2">
              <FaSyringe className="text-pink-600 text-xl" />
              <h3 className="text-lg font-medium">Vaccination List</h3>
            </div>
            <p className="text-sm text-gray-500 mt-1">Add or update vaccine info</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
