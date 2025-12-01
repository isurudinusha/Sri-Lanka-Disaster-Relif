import React from 'react';

const Header = ({ isLoggedIn, onLogout, onHomeClick, onLoginClick, onMyDonationsClick, currentPage }) => {
  return (
    <header style={{
      background: 'white',
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={onHomeClick}
        >
          <img
            src="/logo.png"
            alt="Relief Hub Logo"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
            UK to Sri Lanka Relief Hub
          </h1>
        </div>

        <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {currentPage !== 'dashboard' && (
            <button
              className="btn"
              style={{ color: 'var(--text-secondary)', background: 'transparent' }}
              onClick={onHomeClick}
            >
              Home
            </button>
          )}

          {isLoggedIn && currentPage !== 'mydonations' && (
            <button
              className="btn"
              style={{ color: 'var(--text-secondary)', background: 'transparent' }}
              onClick={onMyDonationsClick}
            >
              My Donations
            </button>
          )}

          {isLoggedIn ? (
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          ) : (
            currentPage !== 'login' && (
              <button className="btn btn-primary" onClick={onLoginClick}>
                Log In
              </button>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
