
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center animate-pulse">
        <div className="flex items-center justify-center">
            <svg className="h-12 w-12 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.42 20L12 17.27L7.58 20L8.45 13.97L4 9.27L9.91 8.26L12 2z"/>
            </svg>
            <h1 className="ml-3 text-4xl font-bold">Luminara</h1>
        </div>
        <p className="mt-2">Loading your network...</p>
      </div>
    </div>
  );
};

export default SplashScreen;