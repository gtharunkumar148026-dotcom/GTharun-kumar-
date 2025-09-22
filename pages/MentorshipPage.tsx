import React, { useState, useMemo } from 'react';
import { AnyUser, Role, Alumni, Faculty } from '../types';

interface MentorshipPageProps {
  currentUser: AnyUser;
  users: AnyUser[];
}

const MentorshipPage: React.FC<MentorshipPageProps> = ({ currentUser, users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const potentialMentors = useMemo(() => {
    return users.filter(user => 
      user.id !== currentUser.id &&
      (user.role === Role.ALUMNI || user.role === Role.FACULTY) &&
      ((user as Alumni).willingToMentor || (user as Faculty).willingToMentor) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       user.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [currentUser.id, searchTerm, users]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Find a Mentor</h1>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search mentors by name or department..."
          className="p-2 border rounded-md w-full"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {potentialMentors.length > 0 ? (
          potentialMentors.map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))
        ) : (
          <p className="text-gray-600">No mentors found matching your search.</p>
        )}
      </div>
    </div>
  );
};

const MentorCard: React.FC<{ mentor: AnyUser }> = ({ mentor }) => {
  const mentorSpecifics = () => {
    if (mentor.role === Role.ALUMNI) {
      return `${(mentor as Alumni).jobTitle} at ${(mentor as Alumni).company}`;
    }
    if (mentor.role === Role.FACULTY) {
      return `${(mentor as Faculty).position}, ${mentor.department}`;
    }
    return '';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
      <img src={mentor.profileImage} alt={mentor.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
      <h3 className="text-lg font-bold">{mentor.name}</h3>
      <p className="text-gray-600 text-center">{mentorSpecifics()}</p>
      <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
        Request Mentorship
      </button>
    </div>
  );
};

export default MentorshipPage;