import React from 'react';
import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaSyringe,
  FaUsers,
} from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 h-screen bg-white/50 backdrop-blur-lg p-6 border-r border-white/30 shadow-md flex flex-col justify-between fixed left-0 top-0">
      <div>
        <h2 className="text-2xl font-bold text-amber-950 mb-8">ToyCycle</h2>
        <ul className="space-y-4">
          <li
            className={`flex items-center gap-3 cursor-pointer hover:text-indigo-600 ${
              isActive('/admin') ? 'text-indigo-700 font-semibold' : ''
            }`}
            onClick={() => navigate('/admin')}
          >
            <MdOutlineDashboard /> Dashboard
          </li>
          <li
            className={`flex items-center gap-3 cursor-pointer hover:text-indigo-600 ${
              isActive('/userview') ? 'text-indigo-700 font-semibold' : ''
            }`}
            onClick={() => navigate('/userview')}
          >
            <FaUsers /> Manage Users
          </li>
          <li
            className={`flex items-center gap-3 cursor-pointer hover:text-indigo-600 ${
              isActive('/toys') ? 'text-indigo-700 font-semibold' : ''
            }`}
            onClick={() => navigate('/toys')}
          >
            <FaBoxOpen /> Manage Toys
          </li>
          <li
            className={`flex items-center gap-3 cursor-pointer hover:text-indigo-600 ${
              isActive('/orders') ? 'text-indigo-700 font-semibold' : ''
            }`}
            onClick={() => navigate('/orders')}
          >
            <FaClipboardList /> Manage Orders
          </li>
          <li
            className={`flex items-center gap-3 cursor-pointer hover:text-indigo-600 ${
              isActive('/vaccination') ? 'text-indigo-700 font-semibold' : ''
            }`}
            onClick={() => navigate('/vaccination')}
          >
            <FaSyringe /> Vaccinations
          </li>
        </ul>
      </div>

      <div
        className="flex items-center gap-3 cursor-pointer text-red-600"
        onClick={handleLogout}
      >
        <FaSignOutAlt /> Logout
      </div>
    </aside>
  );
};

export default SideBar;
