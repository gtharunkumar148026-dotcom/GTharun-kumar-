import React, { useState, useMemo } from 'react';
import { AnyUser, Role } from '../types';
import { Link } from 'react-router-dom';

interface DirectoryPageProps {
  users: AnyUser[];
}

const DirectoryPage: React.FC<DirectoryPageProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const departments = useMemo(() => [...new Set(users.map(u => u.department).filter(Boolean))].sort(), [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const roleMatch = roleFilter === 'all' || user.role === roleFilter;
      const departmentMatch = departmentFilter === 'all' || user.department === departmentFilter;
      return nameMatch && roleMatch && departmentMatch && user.profileComplete;
    });
  }, [searchTerm, roleFilter, departmentFilter, users]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Directory</h1>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 border rounded-md w-full md:w-1/3"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value as Role | 'all')}
        >
          <option value="all">All Roles</option>
          {Object.values(Role).map(role => <option key={role} value={role}>{role}</option>)}
        </select>
        <select
          className="p-2 border rounded-md"
          value={departmentFilter}
          onChange={e => setDepartmentFilter(e.target.value)}
        >
          <option value="all">All Departments</option>
          {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

const UserCard: React.FC<{ user: AnyUser }> = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col justify-between">
      <div>
        <img src={user.profileImage} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
        <h3 className="text-lg font-bold">{user.name}</h3>
        <p className="text-gray-600">{user.role}</p>
        <p className="text-sm text-gray-500">{user.department}</p>
      </div>
      <Link to={`/profile/${user.id}`} className="mt-4 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition text-sm">
        View Profile
      </Link>
    </div>
  );
};

export default DirectoryPage;