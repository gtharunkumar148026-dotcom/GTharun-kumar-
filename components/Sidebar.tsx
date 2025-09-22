import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center p-3 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-900' : ''}`;

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-10 flex items-center justify-center py-4">
        Luminara
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <NavLink to="/dashboard" className={navLinkClasses}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/directory" className={navLinkClasses}>
              Directory
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={navLinkClasses}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/mentorship" className={navLinkClasses}>
              Mentorship
            </NavLink>
          </li>
          <li>
            <NavLink to="/map" className={navLinkClasses}>
              Map View
            </NavLink>
          </li>
          <li>
            <NavLink to="/time-capsule" className={navLinkClasses}>
              Time Capsule
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
