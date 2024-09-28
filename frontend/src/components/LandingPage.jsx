import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Optional for styling

function LandingPage() {
  return (
    <div className="landing-container">
      <h1>Welcome to the Career and Education Portal</h1>
      <p>Please choose your role to proceed:</p>
      <div className="button-container">
        <Link to="/job-seeker">
          <button className="option-button">I am a Job Seeker</button>
        </Link>
        <Link to="/educator">
          <button className="option-button">I am an Educator</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
