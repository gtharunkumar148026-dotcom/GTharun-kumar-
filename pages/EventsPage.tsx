import React from 'react';
import { eventsData } from '../data';

const EventsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Events</h1>
      <div className="space-y-6">
        {eventsData.map(event => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
            <p className="text-lg text-gray-600 mt-1">{event.date}</p>
            <p className="text-gray-500 mt-1">Organized by: {event.organizer}</p>
            <p className="mt-4 text-gray-700">{event.description}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
              RSVP
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
