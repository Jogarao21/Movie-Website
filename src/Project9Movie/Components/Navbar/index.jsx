import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, AuthModal } from '../../Authentication';
import './index.css';

const Navbar = ({ setSearch }) => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    // Open authentication modal after logout
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="nav-link">🎬 MovieMania</Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/popular" className="nav-link">Popular</Link></li>
          <li><Link to="/top-rated" className="nav-link">Top Rated</Link></li>
          <li><Link to="/upcoming" className="nav-link">Upcoming</Link></li>
          <li>
            <input
              type="text"
              placeholder="Search movies..."
              onChange={(e) => setSearch(e.target.value)}
              className="navbar-search"
            />
          </li>
        </ul>
        
        {/* Auth Section */}
        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="navbar-user">
              <span className="navbar-welcome">Welcome, {user?.name || user?.email}</span>
              <button onClick={handleLogout} className="navbar-logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-auth-buttons">
              <button
                onClick={() => handleAuthClick('login')}
                className="navbar-login-btn"
              >
                Login
              </button>
              <button
                onClick={() => handleAuthClick('signup')}
                className="navbar-signup-btn"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;