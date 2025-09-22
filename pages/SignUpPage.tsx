import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnyUser, Role } from '../types';

interface SignUpPageProps {
    onSignUp: (user: AnyUser) => void;
    existingUsers: AnyUser[];
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, existingUsers }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<Role>(Role.STUDENT);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const emailExists = existingUsers.some(user => user.email === email);
        if (emailExists) {
            setError('An account with this email already exists.');
            return;
        }
        
        const newUser: AnyUser = {
            id: Date.now(), // Simple unique ID generation
            name: `${firstName} ${lastName}`,
            email,
            role,
            institutionId: `${role.charAt(0)}${Date.now().toString().slice(-4)}`,
            department: 'Not specified',
            profileImage: `https://i.pravatar.cc/150?u=${email}`,
            profileComplete: false,
        };

        onSignUp(newUser);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        <svg className="h-12 w-12 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.42 20L12 17.27L7.58 20L8.45 13.97L4 9.27L9.91 8.26L12 2z"/>
                        </svg>
                        <h1 className="ml-3 text-4xl font-bold">Luminara</h1>
                    </div>
                    <p className="text-gray-400">Create your account to get started.</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-bold text-gray-400 block">First Name</label>
                            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className="w-full p-2 mt-1 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-bold text-gray-400 block">Last Name</label>
                            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className="w-full p-2 mt-1 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                        </div>
                    </div>
                     <div>
                        <label className="text-sm font-bold text-gray-400 block">I am a...</label>
                        <select value={role} onChange={e => setRole(e.target.value as Role)} className="w-full p-2 mt-1 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400">
                            <option value={Role.STUDENT}>Student</option>
                            <option value={Role.ALUMNI}>Alumni</option>
                            <option value={Role.FACULTY}>Faculty</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-400 block">College Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 mt-1 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-400 block">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-2 mt-1 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-400 block">Re-enter Password</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full p-2 mt-1 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
                    </div>
                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                    <button type="submit" className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-md transition">
                        Create Account
                    </button>
                    <p className="text-center text-sm text-gray-400">
                        Already have an account? <Link to="/login" className="font-medium text-yellow-400 hover:text-yellow-300">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
