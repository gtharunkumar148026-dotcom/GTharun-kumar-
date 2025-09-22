
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initialUsers } from './data';
import { AnyUser } from './types';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardContainer from './components/DashboardContainer';
import DashboardPage from './pages/DashboardPage';
import DirectoryPage from './pages/DirectoryPage';
import EventsPage from './pages/EventsPage';
import MentorshipPage from './pages/MentorshipPage';
import MapPage from './pages/MapPage';
import TimeCapsulePage from './pages/TimeCapsulePage';
import ProfilePage from './pages/ProfilePage';
import SplashScreen from './pages/SplashScreen';

const App: React.FC = () => {
  const [users, setUsers] = useState<AnyUser[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<AnyUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and check for persisted user
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const foundUser = users.find(u => u.id === JSON.parse(savedUser).id);
      if (foundUser) {
        setCurrentUser(foundUser);
      }
    }
    setTimeout(() => setLoading(false), 1500);
  }, [users]);

  const handleLogin = (user: AnyUser) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };
  
  const handleSignUp = (user: AnyUser) => {
    const newUsers = [...users, user];
    setUsers(newUsers);
    handleLogin(user);
    // After sign up, user needs to be redirected to onboarding
  };
  
  const handleUpdateUser = (updatedUser: AnyUser) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (currentUser?.id === updatedUser.id) {
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={!currentUser ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!currentUser ? <LoginPage onLogin={handleLogin} users={users} /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!currentUser ? <SignUpPage onSignUp={handleSignUp} existingUsers={users} /> : <Navigate to="/dashboard" />} />
        
        {currentUser && !currentUser.profileComplete && (
            <Route path="/onboarding" element={<OnboardingPage user={currentUser} onComplete={handleUpdateUser} />} />
        )}
        
        {currentUser ? (
          <>
            {!currentUser.profileComplete && <Route path="/*" element={<Navigate to="/onboarding" />} />}
            {currentUser.profileComplete && (
              <Route path="/" element={<DashboardContainer user={currentUser} onLogout={handleLogout} />}>
                <Route path="dashboard" element={<DashboardPage user={currentUser} />} />
                <Route path="directory" element={<DirectoryPage users={users} />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="mentorship" element={<MentorshipPage currentUser={currentUser} users={users} />} />
                <Route path="map" element={<MapPage users={users} />} />
                <Route path="time-capsule" element={<TimeCapsulePage currentUser={currentUser} users={users} />} />
                <Route path="profile/:userId" element={<ProfilePage users={users} currentUser={currentUser} onUpdateUser={handleUpdateUser} />} />
                <Route index element={<Navigate to="/dashboard" />} />
              </Route>
            )}
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
