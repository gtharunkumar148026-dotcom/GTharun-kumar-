import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { AnyUser } from '../types';

interface DashboardContainerProps {
    user: AnyUser;
    onLogout: () => void;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ user, onLogout }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardContainer;
