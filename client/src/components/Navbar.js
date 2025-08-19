import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: '▬' },
    { path: '/jets', label: 'Browse Jets', icon: '◐' },
    { path: '/search', label: 'Search Flights', icon: '◇' },
    { path: '/deals', label: 'Deals', icon: '◆' },
    { path: '/compare', label: 'Compare', icon: '≏' },
    { path: '/track', label: 'Track Flight', icon: '◉' },
    { path: '/pricing', label: 'Pricing', icon: '▣' },
    { path: '/weather', label: 'Weather', icon: '◐' },
    { path: '/dashboard', label: 'Dashboard', icon: '▤' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">◐</span>
          Ejets
        </Link>
        
        <div className="navbar-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
        >
          ≡
        </button>
      </div>

      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
