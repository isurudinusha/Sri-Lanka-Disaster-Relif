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

  return (
    <>
      <header style={{
        background: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container" style={{
          height: isMobile ? '64px' : '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 20px'
        }}>
          {/* Logo and Title */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px', cursor: 'pointer' }}
            onClick={onHomeClick}
          >
            <img
              src="/logo.png"
              alt="Relief Hub Logo"
              style={{
                width: isMobile ? '36px' : '44px',
                height: isMobile ? '36px' : '44px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <h1 style={{
              fontSize: isMobile ? '1.1rem' : '1.5rem',
              fontWeight: '700',
              color: 'var(--primary)',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {isMobile ? 'Relief Hub' : 'UK to Sri Lanka Relief Hub'}
            </h1>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              {currentPage !== 'dashboard' && (
                <button
                  className="btn"
                  style={{ color: 'var(--text-secondary)', background: 'transparent', minWidth: 'auto' }}
                  onClick={onHomeClick}
                >
                  Home
                </button>
              )}

              {isLoggedIn && currentPage !== 'mydonations' && (
                <button
                  className="btn"
                  style={{ color: 'var(--text-secondary)', background: 'transparent', minWidth: 'auto' }}
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
          )}

          {/* Mobile Hamburger Menu */}
          {isMobile && (
            <button
              className="hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                background: 'none',
                border: 'none',
                padding: '8px',
                cursor: 'pointer'
              }}
            >
              <span style={{
                width: '24px',
                height: '3px',
                backgroundColor: 'var(--primary)',
                borderRadius: '3px',
                transition: 'all 0.3s',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'
              }}></span>
              <span style={{
                width: '24px',
                height: '3px',
                backgroundColor: 'var(--primary)',
                borderRadius: '3px',
                transition: 'all 0.3s',
                opacity: mobileMenuOpen ? '0' : '1'
              }}></span>
              <span style={{
                width: '24px',
                height: '3px',
                backgroundColor: 'var(--primary)',
                borderRadius: '3px',
                transition: 'all 0.3s',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'
              }}></span>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          background: 'white',
          boxShadow: mobileMenuOpen ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
          maxHeight: mobileMenuOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          zIndex: 99,
          borderTop: mobileMenuOpen ? '1px solid #f0f0f0' : 'none'
        }}>
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            padding: mobileMenuOpen ? '16px' : '0 16px',
            gap: '8px'
          }}>
            {currentPage !== 'dashboard' && (
              <button
                className="btn"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  background: 'transparent',
                  fontSize: '1rem',
                  padding: '14px'
                }}
                onClick={onHomeClick}
              >
                Home
              </button>
            )}

            {isLoggedIn && currentPage !== 'mydonations' && (
              <button
                className="btn"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  background: 'transparent',
                  fontSize: '1rem',
                  padding: '14px'
                }}
                onClick={onMyDonationsClick}
              >
                My Donations
              </button>
            )}

            {isLoggedIn ? (
              <button
                className="btn btn-secondary"
                onClick={onLogout}
                style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '14px' }}
              >
                Logout
              </button>
            ) : (
              currentPage !== 'login' && (
                <button
                  className="btn btn-primary"
                  onClick={onLoginClick}
                  style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '14px' }}
                >
                  Log In
                </button>
              )
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
