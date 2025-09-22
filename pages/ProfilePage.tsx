
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnyUser, Role, Student, Alumni, Faculty } from '../types';

interface ProfilePageProps {
  users: AnyUser[];
  currentUser: AnyUser;
  onUpdateUser: (user: AnyUser) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ users, currentUser, onUpdateUser }) => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<AnyUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<AnyUser>>({});

  useEffect(() => {
    const foundUser = users.find(u => u.id === parseInt(userId || ''));
    if (foundUser) {
      setUser(foundUser);
      setFormData(foundUser);
    } else {
      navigate('/directory');
    }
  }, [userId, users, navigate]);

  if (!user) {
    return <div>Loading profile...</div>;
  }
  
  const isCurrentUserProfile = currentUser.id === user.id;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'interests' | 'skills' | 'researchAreas') => {
      setFormData(prev => ({ ...prev, [field]: e.target.value.split(',').map(item => item.trim()) }));
  };

  const handleSave = () => {
      const updatedUser = { ...user, ...formData } as AnyUser;
      onUpdateUser(updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
  };

  const renderUserDetails = () => {
    const displayValue = (label: string, value: any) => value ? <p><strong className="font-semibold">{label}:</strong> {value}</p> : null;

    const renderArray = (label: string, items?: string[]) => items && items.length > 0 ? (
        <div>
            <strong className="font-semibold">{label}:</strong>
            <div className="flex flex-wrap gap-2 mt-1">
                {items.map(item => <span key={item} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">{item}</span>)}
            </div>
        </div>
    ) : null;

    return (
        <>
            <p><strong className="font-semibold">Email:</strong> {user.email}</p>
            <p><strong className="font-semibold">Department:</strong> {user.department}</p>
            {user.role === Role.STUDENT && (
                <>
                    {displayValue('Enrollment Year', (user as Student).enrollmentYear)}
                    {displayValue('Expected Graduation', (user as Student).expectedGraduationYear)}
                    {displayValue('Career Goals', (user as Student).careerGoals)}
                    {renderArray('Interests', (user as Student).interests)}
                </>
            )}
            {user.role === Role.ALUMNI && (
                <>
                    {displayValue('Graduation Year', (user as Alumni).graduationYear)}
                    {displayValue('Company', (user as Alumni).company)}
                    {displayValue('Job Title', (user as Alumni).jobTitle)}
                    {renderArray('Skills', (user as Alumni).skills)}
                    {(user as Alumni).linkedIn && <p><strong className="font-semibold">LinkedIn:</strong> <a href={(user as Alumni).linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Profile</a></p>}
                    <p><strong className="font-semibold">Willing to Mentor:</strong> {(user as Alumni).willingToMentor ? 'Yes' : 'No'}</p>
                </>
            )}
            {user.role === Role.FACULTY && (
                <>
                    {displayValue('Position', (user as Faculty).position)}
                    {renderArray('Research Areas', (user as Faculty).researchAreas)}
                    <p><strong className="font-semibold">Willing to Mentor:</strong> {(user as Faculty).willingToMentor ? 'Yes' : 'No'}</p>
                </>
            )}
        </>
    );
  };
  
   const renderEditForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <input type="text" name="department" value={formData.department || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      {user.role === Role.STUDENT && (
          <>
             <div><label className="block text-sm font-medium text-gray-700">Interests (comma-separated)</label><input type="text" name="interests" value={(formData as Student).interests?.join(', ') || ''} onChange={(e) => handleArrayChange(e, 'interests')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/></div>
             <div><label className="block text-sm font-medium text-gray-700">Career Goals</label><textarea name="careerGoals" value={(formData as Student).careerGoals || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/></div>
          </>
      )}
      {user.role === Role.ALUMNI && (
          <>
             <div><label className="block text-sm font-medium text-gray-700">Company</label><input type="text" name="company" value={(formData as Alumni).company || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/></div>
             <div><label className="block text-sm font-medium text-gray-700">Job Title</label><input type="text" name="jobTitle" value={(formData as Alumni).jobTitle || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/></div>
             <div><label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label><input type="text" name="skills" value={(formData as Alumni).skills?.join(', ') || ''} onChange={(e) => handleArrayChange(e, 'skills')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/></div>
             <div><label className="block text-sm font-medium text-gray-700">LinkedIn Profile URL</label><input type="text" name="linkedIn" value={(formData as Alumni).linkedIn || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/></div>
             <div className="flex items-center"><input type="checkbox" name="willingToMentor" checked={(formData as Alumni).willingToMentor || false} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded"/><label className="ml-2 block text-sm text-gray-900">Willing to Mentor</label></div>
          </>
      )}
      {user.role === Role.FACULTY && (
         <>
             <div><label className="block text-sm font-medium text-gray-700">Position</label><input type="text" name="position" value={(formData as Faculty).position || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/></div>
             <div><label className="block text-sm font-medium text-gray-700">Research Areas (comma-separated)</label><input type="text" name="researchAreas" value={(formData as Faculty).researchAreas?.join(', ') || ''} onChange={(e) => handleArrayChange(e, 'researchAreas')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/></div>
             <div className="flex items-center"><input type="checkbox" name="willingToMentor" checked={(formData as Faculty).willingToMentor || false} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded"/><label className="ml-2 block text-sm text-gray-900">Willing to Mentor</label></div>
         </>
      )}

    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start">
            <div className="flex items-center mb-6">
                <img src={user.profileImage} alt={user.name} className="w-32 h-32 rounded-full mr-6 border-4 border-gray-200" />
                <div>
                <h1 className="text-4xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-xl text-gray-500">{user.role}</p>
                </div>
            </div>
            {isCurrentUserProfile && !isEditing && (
                <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                    Edit Profile
                </button>
            )}
        </div>
        
        <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Details</h2>
            <div className="space-y-3">
              {isEditing ? renderEditForm() : renderUserDetails()}
            </div>
            {isEditing && (
              <div className="mt-6 flex gap-4">
                <button onClick={handleSave} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">Save Changes</button>
                <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition">Cancel</button>
              </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
