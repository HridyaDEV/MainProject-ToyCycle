import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../Api/userApi';
import SideBar from '../components/SideBar';

const AdminUserView = () => {
  const [users, setUsers] = useState([]);

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
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50 text-gray-800">
                <td className="border px-4 py-2">{user.userName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
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
