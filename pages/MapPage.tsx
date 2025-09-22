import React from 'react';
import { AnyUser, Role } from '../types';

interface MapPageProps {
  users: AnyUser[];
}

const MapPage: React.FC<MapPageProps> = ({ users }) => {
  const alumniWithLocations = users.filter(u => u.role === Role.ALUMNI && u.lat && u.lng);
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Alumni Map</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="h-96 bg-gray-300 rounded flex items-center justify-center mb-4">
          <p className="text-gray-500 text-lg">Map Placeholder</p>
          {/* A real implementation would use a library like Google Maps, Leaflet, or Mapbox */}
        </div>
        <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Alumni Locations</h2>
            <ul className="divide-y divide-gray-200">
                {alumniWithLocations.map(alumni => (
                    <li key={alumni.id} className="py-2 flex justify-between">
                      <span>{alumni.name} - {(alumni as any).company}</span>
                      <span className="text-gray-500">({alumni.lat}, {alumni.lng})</span>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default MapPage;