import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../Api/userApi';
import SideBar from '../components/SideBar';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(id)
      .then(data => {
        setUser(data?.user);
        console.log("User details:", data?.user);
      })
      .catch(err => {
        console.error("Failed to fetch user:", err);
      });
  }, [id]);

  if (!user) return <p className="text-center mt-10 text-gray-600">Loading user...</p>;

  return (
    <div className="p-6 pl-72 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <SideBar />
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Details</h2>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <p><strong>Name:</strong> {user.userName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        {/* Children Section */}
        {user.children?.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Children</h3>
            <ul className="space-y-4">
              {user.children.map((child, index) => (
                <li key={child._id} className="border p-4 rounded-md bg-gray-50">
                  <p><strong>Name:</strong> {child.name}</p>
                  <p><strong>Gender:</strong> {child.gender}</p>
                  <p><strong>DOB:</strong> {new Date(child.dateOfBirth).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4 text-gray-600">No children registered.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
