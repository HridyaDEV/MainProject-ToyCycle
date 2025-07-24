import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../Api/userApi';
import SideBar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';

const AdminUserView = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then(data => {
        console.log("Fetched users:", data?.users);
        setUsers(data?.users || []);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
      });
  }, []);

  return (
    <div className="p-6 pl-72 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <SideBar />
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Users</h2>

      {Array.isArray(users) && users.length > 0 ? (
        <table className="table-auto w-full border border-gray-200 shadow-md bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50 text-gray-800">
                <td className="border px-4 py-2">{user.userName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => navigate(`/userdetails/${user._id}`)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600 mt-4">No users found.</p>
      )}
    </div>
  );
};

export default AdminUserView;
