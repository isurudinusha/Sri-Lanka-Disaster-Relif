import React, { useState, useEffect } from 'react';

const Header = ({ isLoggedIn, onLogout, onHomeClick, onLoginClick, onMyDonationsClick, currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when page changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPage]);

  // Mobile App-style Bottom Navigation
  if (isMobile) {
    return (
      <>
        {/* Top App Bar - Minimal */}
        <header style={{
          background: 'white',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="/logo.png"
                alt="Relief Hub"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <h1 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)', margin: 0 }}>
                Relief Hub
              </h1>
            </div>
          </div>
        </header>

        {/* Bottom Navigation Bar */}
        <nav style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'white',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-around',
          padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
          borderTop: '1px solid #f0f0f0'
        }}>
          <button
            onClick={onHomeClick}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              padding: '8px',
              color: currentPage === 'dashboard' ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>🏠</span>
            <span style={{ fontSize: '0.7rem', fontWeight: currentPage === 'dashboard' ? '600' : '400' }}>Home</span>
          </button>

          {isLoggedIn && (
            <button
              onClick={() => onHomeClick()} // Will navigate to donate page after login
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                padding: '8px',
                color: currentPage === 'donate' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>💝</span>
              <span style={{ fontSize: '0.7rem', fontWeight: currentPage === 'donate' ? '600' : '400' }}>Donate</span>
            </button>
          )}

          {isLoggedIn && (
            <button
              onClick={onMyDonationsClick}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                padding: '8px',
                color: currentPage === 'mydonations' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>📋</span>
              <span style={{ fontSize: '0.7rem', fontWeight: currentPage === 'mydonations' ? '600' : '400' }}>My Donations</span>
            </button>
          )}

          <button
            onClick={isLoggedIn ? onLogout : onLoginClick}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              padding: '8px',
              color: currentPage === 'login' ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{isLoggedIn ? '🚪' : '🔑'}</span>
            <span style={{ fontSize: '0.7rem', fontWeight: currentPage === 'login' ? '600' : '400' }}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </span>
          </button>
        </nav>
      </>
    );
  }

  // Desktop Header - Traditional
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
