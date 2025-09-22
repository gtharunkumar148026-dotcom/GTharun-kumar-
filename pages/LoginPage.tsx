import React, { useState } from 'react';
import { AnyUser } from '../types';
import { Link } from 'react-router-dom';

interface LoginPageProps {
  onLogin: (user: AnyUser) => void;
  users: AnyUser[];
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, users }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.email === email);
    if (user) {
      // In a real app, you'd check the password
      onLogin(user);
    } else {
      setError('User not found. Please check your email or sign up.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
            <div className="flex items-center justify-center mb-4">
                <svg className="h-12 w-12 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.42 20L12 17.27L7.58 20L8.45 13.97L4 9.27L9.91 8.26L12 2z"/>
                </svg>
                <h1 className="ml-3 text-4xl font-bold">Luminara</h1>
            </div>
            <p className="text-gray-400">Sign in to connect with your alumni network.</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-sm font-bold text-gray-400 block">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
              placeholder="e.g., jane.doe@alumni.edu"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-gray-400 block">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 text-gray-100 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
              placeholder="anything will work for this demo"
            />
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit" className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-md transition">
            Sign In
          </button>
           <p className="text-center text-sm text-gray-400">
             Don't have an account? <Link to="/signup" className="font-medium text-yellow-400 hover:text-yellow-300">Sign Up</Link>
           </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;