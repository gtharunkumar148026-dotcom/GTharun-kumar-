import React from 'react';
import { AnyUser } from '../types';
import { eventsData, alumniData, studentData } from '../data';
import { Link } from 'react-router-dom';

interface DashboardPageProps {
  user: AnyUser;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {user.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Profile Summary</h2>
          <div className="flex items-center">
            <img src={user.profileImage} alt={user.name} className="w-20 h-20 rounded-full mr-4 border-4 border-gray-200"/>
            <div>
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-gray-600">{user.department}</p>
              <Link to={`/profile/${user.id}`} className="text-blue-500 hover:underline mt-1 inline-block">View & Edit Profile</Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Network Stats</h2>
          <div className="space-y-2">
            <p><strong className="font-medium">{alumniData.length}</strong> Alumni</p>
            <p><strong className="font-medium">{studentData.length}</strong> Students</p>
            <p><strong className="font-medium">{eventsData.length}</strong> Upcoming Events</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Upcoming Events</h2>
          <ul className="space-y-3">
            {eventsData.slice(0, 3).map(event => (
              <li key={event.id} className="border-b last:border-b-0 pb-3">
                <p className="font-bold">{event.title}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </li>
            ))}
          </ul>
          <Link to="/events" className="text-blue-500 hover:underline mt-4 inline-block font-semibold">View All Events</Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Quick Links</h2>
          <ul className="space-y-3">
            <li><Link to="/directory" className="text-blue-500 hover:underline">Alumni Directory</Link></li>
            <li><Link to="/mentorship" className="text-blue-500 hover:underline">Find a Mentor</Link></li>
            <li><Link to="/map" className="text-blue-500 hover:underline">Alumni Map</Link></li>
            <li><Link to="/time-capsule" className="text-blue-500 hover:underline">Time Capsule</Link></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
