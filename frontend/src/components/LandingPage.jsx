// import React from 'react';
// import { Link } from 'react-router-dom';
// import './LandingPage.css'; // Optional for styling

// function LandingPage() {
//   return (
//     <div className="landing-container">
//       <h1>Welcome to the Career and Education Portal</h1>
//       <p>Please choose your role to proceed:</p>
//       <div className="button-container">
//         <Link to="/job-seeker">
//           <button className="option-button">I am a Job Seeker</button>
//         </Link>
//         <Link to="/educator">
//           <button className="option-button">I am an Educator</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Navbar from './Navbar'; // Assuming the Navbar file is in the same directory
import './LandingPage.css'; // Your existing styles

function LandingPage() {
  const navigate = useNavigate(); // Create a navigation instance

  return (
    <div>
      {/* Include Navbar at the top */}
      <Navbar />
      
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="content-left">
          <h1>
            <span className="bold-text">Building Community.</span>
            <span className="bold-text"> Creating </span>
            <span className="script-text">Connections.</span>
          </h1>
        </div>

        <div className="content-right">
          {/* Replacing the paragraph with three buttons */}
          <div className="cta-buttons">
            <button 
              className="cta-button educator-button" 
              onClick={() => navigate('/educator')}
            >
              Educator
            </button>
            <button 
              className="cta-button jobseeker-button"
              onClick={() => navigate('/job-seeker')} // This will navigate to the TargetRolePage
            >
              Job Seeker
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
