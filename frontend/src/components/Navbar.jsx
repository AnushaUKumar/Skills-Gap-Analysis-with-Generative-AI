import React from 'react';
import './Navbar.css'; // Ensure you create this file for styling

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <img src="techbuffalo.png" alt="TechBuffalo Logo" className="logo-img" />
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <ul>
            <li><a href="#who-we-are">Who We Are</a></li>
            <li><a href="#who-we-serve">Who We Serve</a></li>
            <li><a href="#tech-training">Tech Training</a></li>
            <li><a href="#state-of-tech">State of Tech WNY</a></li>
          </ul>
        </nav>

        
      </div>
    </header>
  );
}

export default Navbar;
