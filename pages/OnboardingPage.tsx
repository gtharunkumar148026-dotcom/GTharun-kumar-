
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnyUser, Role, Student, Alumni, Faculty } from '../types';

interface OnboardingPageProps {
    user: AnyUser;
    onComplete: (user: AnyUser) => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ user, onComplete }) => {
    const [formData, setFormData] = useState<Partial<AnyUser>>({ ...user });
    const navigate = useNavigate();

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedUser = {
            ...user,
            ...formData,
            profileComplete: true,
        };
        onComplete(updatedUser as AnyUser);
        navigate('/dashboard');
    };

    const renderRoleSpecificFields = () => {
        switch (user.role) {
            case Role.STUDENT:
                return (
                    <>
                        <InputField name="enrollmentYear" label="Enrollment Year" type="number" value={(formData as Student).enrollmentYear || ''} onChange={handleInputChange} />
                        <InputField name="expectedGraduationYear" label="Expected Graduation Year" type="number" value={(formData as Student).expectedGraduationYear || ''} onChange={handleInputChange} />
                        <InputField name="interests" label="Interests (comma-separated)" value={(formData as Student).interests?.join(', ') || ''} onChange={(e) => handleArrayChange(e, 'interests')} />
                        <TextAreaField name="careerGoals" label="Career Goals" value={(formData as Student).careerGoals || ''} onChange={handleInputChange} />
                    </>
                );
            case Role.ALUMNI:
                return (
                    <>
                        <InputField name="graduationYear" label="Graduation Year" type="number" value={(formData as Alumni).graduationYear || ''} onChange={handleInputChange} />
                        <InputField name="company" label="Current Company" value={(formData as Alumni).company || ''} onChange={handleInputChange} />
                        <InputField name="jobTitle" label="Job Title" value={(formData as Alumni).jobTitle || ''} onChange={handleInputChange} />
                        <InputField name="skills" label="Skills (comma-separated)" value={(formData as Alumni).skills?.join(', ') || ''} onChange={(e) => handleArrayChange(e, 'skills')} />
                        <InputField name="linkedIn" label="LinkedIn Profile URL" type="url" value={(formData as Alumni).linkedIn || ''} onChange={handleInputChange} />
                        <CheckboxField name="willingToMentor" label="I'm willing to mentor students/alumni" checked={(formData as Alumni).willingToMentor || false} onChange={handleInputChange} />
                    </>
                );
            case Role.FACULTY:
                return (
                    <>
                       <InputField name="position" label="Position (e.g., Professor, Lecturer)" value={(formData as Faculty).position || ''} onChange={handleInputChange} />
                       <InputField name="researchAreas" label="Research Areas (comma-separated)" value={(formData as Faculty).researchAreas?.join(', ') || ''} onChange={(e) => handleArrayChange(e, 'researchAreas')} />
                       <CheckboxField name="willingToMentor" label="I'm willing to mentor students" checked={(formData as Faculty).willingToMentor || false} onChange={handleInputChange} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome, {user.name}!</h1>
                    <p className="mt-2 text-gray-600">Let's complete your profile to get you started.</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <InputField name="department" label="Department" value={formData.department || ''} onChange={handleInputChange} required />
                    {renderRoleSpecificFields()}
                    <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition">
                        Complete Profile & Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

// Helper components for form fields
const InputField = ({ name, label, type = 'text', value, onChange, required = false }: any) => (
    <div>
        <label htmlFor={name} className="text-sm font-bold text-gray-700 block">{label}</label>
        <input type={type} id={name} name={name} value={value} onChange={onChange} required={required} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
);

const TextAreaField = ({ name, label, value, onChange }: any) => (
     <div>
        <label htmlFor={name} className="text-sm font-bold text-gray-700 block">{label}</label>
        <textarea id={name} name={name} value={value} onChange={onChange} rows={3} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
);

const CheckboxField = ({ name, label, checked, onChange }: any) => (
    <div className="flex items-center">
        <input type="checkbox" id={name} name={name} checked={checked} onChange={onChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
        <label htmlFor={name} className="ml-2 block text-sm text-gray-900">{label}</label>
    </div>
);

export default OnboardingPage;
