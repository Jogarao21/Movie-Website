import React from 'react';
import './Sidebar.scss';

const Sidebar = ({ isMobileMenuOpen, closeMobileMenu, handleSmoothScroll }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      />
      
      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <nav className="sidebar-nav">
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</a>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a>
          <a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')}>Skills</a>
          <a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')}>Projects</a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;