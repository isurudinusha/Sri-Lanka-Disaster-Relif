import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import DonationForm from './components/DonationForm';
import Dashboard from './components/Dashboard';
import MyDonations from './components/MyDonations';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard', 'login', 'donate', 'mydonations'

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('donate');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentPage('dashboard');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleStartDonating = () => {
    if (user) {
      // If already logged in, go directly to donation form
      navigateTo('donate');
    } else {
      // Otherwise, redirect to login
      navigateTo('login');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'donate':
        return user ? <DonationForm /> : <Login onLogin={handleLogin} />;
      case 'mydonations':
        return user ? <MyDonations /> : <Login onLogin={handleLogin} />;
      case 'dashboard':
      default:
        return <Dashboard onStartDonating={handleStartDonating} />;
    }
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={!!user}
        onLogout={handleLogout}
        onHomeClick={() => navigateTo('dashboard')}
        onLoginClick={() => navigateTo('login')}
        onMyDonationsClick={() => navigateTo('mydonations')}
        currentPage={currentPage}
      />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
