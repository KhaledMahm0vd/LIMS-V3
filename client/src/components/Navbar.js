import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-gray-800">
              LIMS
            </Link>
            <div className="ml-10 space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link to="/prices" className="text-gray-600 hover:text-gray-900">
                Analysis Prices
              </Link>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
