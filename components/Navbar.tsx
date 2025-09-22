import React from 'react';
import { AnyUser } from '../types';
import { Link } from 'react-router-dom';

interface NavbarProps {
  user: AnyUser;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-md text-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      <div className="flex items-center">
        <span className="mr-4">Welcome, {user.name}</span>
        <Link to={`/profile/${user.id}`}>
            <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full mr-4 border-2 border-yellow-300 hover:border-yellow-500 transition" />
        </Link>
        <button onClick={onLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
