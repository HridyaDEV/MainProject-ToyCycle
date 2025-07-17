import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../Api/userApi'; // Make sure this path is correct

const AdminUserView = () => {
  const [users, setUsers] = useState([]);

 useEffect(() => {
  getAllUsers()
    .then(data => {
      console.log("Fetched users:", data?.users); // Safe logging
      setUsers(data?.users || []);
    })
    .catch(err => {
      console.error("Error fetching users:", err);
    });
}, []);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      {Array.isArray(users) && users.length > 0 ? (
        <table className="table-auto w-full border border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{user.userName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AdminUserView;
