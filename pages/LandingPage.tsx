import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <svg className="h-16 w-16 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.42 20L12 17.27L7.58 20L8.45 13.97L4 9.27L9.91 8.26L12 2z"/>
          </svg>
          <h1 className="ml-4 text-6xl font-bold">Luminara</h1>
        </div>
        <p className="text-xl text-gray-300 mt-2 mb-8">Reconnect. Mentor. Grow.</p>
        <div className="flex justify-center gap-4">
            <Link to="/login" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition">
                Sign In
            </Link>
            <Link to="/signup" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg transition">
                Sign Up
            </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;