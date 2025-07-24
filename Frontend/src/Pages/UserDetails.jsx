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
        {/* Add more fields if needed */}
      </div>

      {user.children?.length > 0 && (
  <div className="mt-6">
    <h3 className="text-xl font-semibold mb-2">Children</h3>
    <ul className="list-disc pl-6 space-y-2">
      {user.children.map((child, index) => (
        <li key={index}>
          <p><strong>Name:</strong> {child.name}</p>
          <p><strong>Age:</strong> {child.age}</p>
          <p><strong>Gender:</strong> {child.gender}</p>
          <hr className="my-2" />
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
};

export default UserDetails;
