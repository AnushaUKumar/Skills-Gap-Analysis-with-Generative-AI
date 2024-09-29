// import React, { useState, useEffect } from 'react';
// import './LearningPathDashboard.css';

// const LearningPathDashboard = () => {
//   const [skillsGap, setSkillsGap] = useState([]);

//   // Simulating API call to fetch skills gap and corresponding percentages and learning paths
//   const fetchSkillsGap = async () => {
//     try {
//       const response = await fetch('/api/getSkillsGapWithPaths'); // Adjust with your API endpoint
//       const data = await response.json();
//       setSkillsGap(data.skills); // Assuming the API returns an array of skills with details
//     } catch (error) {
//       console.error("Failed to fetch skills gap:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSkillsGap();
//   }, []); // Fetch skills gap data when the component mounts

//   return (
//     <div className="learning-path-dashboard">
//       <h2>Learning Path Dashboard</h2>

//       {skillsGap.length > 0 ? (
//         skillsGap.map((skill, index) => (
//           <div key={index} className="skill-section">
//             <div className="skill-header">
//               <span className="skill-name">{skill.name}</span>
//               <span className="skill-percentage">{skill.percentage}%</span>
//             </div>

//             {/* Progress Bar */}
//             <div className="progress-bar-container">
//               <div
//                 className="progress-bar"
//                 style={{ width: '${skill.percentage}% '}}
//               ></div>
//             </div>

//             {/* Learning Paths */}
//             <div className="learning-paths">
//               <h4>Learning Paths:</h4>
//               <ul>
//                 {skill.learningPaths.map((path, idx) => (
//                   <li key={idx}>
//                     <a href={path.link} target="_blank" rel="noopener noreferrer">
//                       {path.title}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No skills gap available.</p>
//       )}
//     </div>
//   );
// };

// export default LearningPathDashboard;

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import './LearningPathDashboard.css';

// const LearningPathDashboard = () => {
//   const location = useLocation();
//   const { skillsGap = [] } = location.state || {};

//   return (
//     <div className="learning-path-dashboard">
//       <h2>Learning Path Dashboard</h2>

//       {skillsGap.length > 0 ? (
//         skillsGap.map((skill, index) => (
//           <div key={index} className="skill-section">
//             <div className="skill-header">
//               <span className="skill-name">{skill}</span>
//               <span className="skill-percentage">Learning path to follow</span>
//             </div>

//             {/* You can add logic here to display specific learning paths based on the skill */}
//             <div className="learning-paths">
//               <h4>Suggested Learning Paths:</h4>
//               <ul>
//                 <li>
//                   <a href={`https://example.com/learn/${skill}`} target="_blank" rel="noopener noreferrer">
//                     Learn {skill} here
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No skills gap available.</p>
//       )}
//     </div>
//   );
// };

// export default LearningPathDashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import './LearningPathDashboard.css';

// const LearningPathDashboard = () => {
//   const location = useLocation();
//   const { skillsGap = [] } = location.state || {};
//   const [learningPaths, setLearningPaths] = useState({}); // Store learning paths for each skill
//   const [error, setError] = useState(null);

//   const fetchLearningPath = async (skill) => {
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/get-learning-path', {
//         language: skill,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       // Set the learning path URL for the skill
//       setLearningPaths((prevPaths) => ({
//         ...prevPaths,
//         [skill]: response.data.path || `https://example.com/learn/${skill}`,
//       }));
//     } catch (error) {
//       setError(`Failed to fetch learning path for ${skill}`);
//       console.error('API error:', error);
//     }
//   };

//   const handleSkillClick = (skill) => {
//     // Check if the learning path is already fetched; if not, fetch it
//     if (!learningPaths[skill]) {
//       fetchLearningPath(skill);
//     }
//   };

//   return (
//     <div className="learning-path-dashboard">
//       <h2>Learning Path Dashboard</h2>

//       {skillsGap.length > 0 ? (
//         skillsGap.map((skill, index) => (
//           <div key={index} className="skill-section">
//             <div className="skill-header">
//               <span className="skill-name">{skill}</span>
//               <span className="skill-percentage">Learning path to follow</span>
//             </div>

//             <div className="learning-paths">
//               <h4>Suggested Learning Paths:</h4>
//               <ul>
//                 <li>
//                   <a
//                     href={learningPaths[skill] || '#'} // Use fetched learning path or '#' while fetching
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     onClick={() => handleSkillClick(skill)} // Fetch learning path when clicked
//                   >
//                     {learningPaths[skill] ? `Learn ${skill} here` : `Fetch learning path for ${skill}`}
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No skills gap available.</p>
//       )}

//       {/* Display any error messages */}
//       {error && <div className="error-message">{error}</div>}
//     </div>
//   );
// };

// export default LearningPathDashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import './LearningPathDashboard.css';

// const LearningPathDashboard = () => {
//   const location = useLocation();
//   const { skillsGap = [] } = location.state || {};
//   const [learningPaths, setLearningPaths] = useState({}); // Store learning paths for each skill
//   const [error, setError] = useState(null);
//   const [loadingSkills, setLoadingSkills] = useState({}); // Store loading state for each skill

//   const fetchLearningPath = async (skill) => {
//     try {
//       console.log(`Fetching learning path for: ${skill}`);
//       const response = await axios.post('http://127.0.0.1:5000/get-learning-path', {
//         language: skill,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       console.log('API Response:', response.data);
  
//       // Navigate to the new page with resources in the state
//       navigate('/learning-resources', { state: { resources: response.data.resources || [] } });
//     } catch (error) {
//       setError(`Failed to fetch learning path for ${skill}`);
//       console.error('API error:', error);
//     }
//   };
  


//   const handleSkillClick = (skill) => {
//     // Check if the learning path is already fetched; if not, fetch it
//     if (!learningPaths[skill] && !loadingSkills[skill]) {
//       fetchLearningPath(skill);
//     }
//   };

//   return (
//     <div className="learning-path-dashboard">
//       <h2>Learning Path Dashboard</h2>

//       {skillsGap.length > 0 ? (
//         skillsGap.map((skill, index) => (
//           <div key={index} className="skill-section">
//             <div className="skill-header">
//               <span className="skill-name">{skill}</span>
//               <span className="skill-percentage">Learning path to follow</span>
//             </div>

//             <div className="learning-paths">
//               <h4>Suggested Learning Paths:</h4>
//               <ul>
//                 <li>
//                   <a
//                     href={learningPaths[skill] || '#'} // Use fetched learning path or '#' while fetching
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     onClick={() => handleSkillClick(skill)} // Fetch learning path when clicked
//                   >
//                     {loadingSkills[skill]
//                       ? `Fetching learning path for ${skill}...`
//                       : learningPaths[skill]
//                       ? `Learn ${skill} here`
//                       : `Fetch learning path for ${skill}`}
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No skills gap available.</p>
//       )}

//       {/* Display any error messages */}
//       {error && <div className="error-message">{error}</div>}
//     </div>
//   );
// };

// export default LearningPathDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './LearningPathDashboard.css';

const LearningPathDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { skillsGap = [] } = location.state || {};
  const [learningPaths, setLearningPaths] = useState({}); // Store learning paths for each skill
  const [error, setError] = useState(null);

  const fetchLearningPath = async (skill) => {
    try {
      console.log(`Fetching learning path for: ${skill}`);
      const response = await axios.post('http://127.0.0.1:5000/get-learning-path', {
        language: skill,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response:', response.data);

      // Navigate to the new page with resources in the state
      navigate('/learning-resources', { state: { resources: response.data.resources || [] } });
    } catch (error) {
      setError(`Failed to fetch learning path for ${skill}`);
      console.error('API error:', error);
    }
  };

  const handleSkillClick = (skill) => {
    // Check if the learning path is already fetched; if not, fetch it
    if (!learningPaths[skill]) {
      fetchLearningPath(skill);
    }
  };

  return (
    <div className="learning-path-dashboard">
      <h2>Learning Path Dashboard</h2>

      {skillsGap.length > 0 ? (
        skillsGap.map((skill, index) => (
          <div key={index} className="skill-section">
            <div className="skill-header">
              <span className="skill-name">{skill}</span>
              <span className="skill-percentage">Learning path to follow</span>
            </div>

            <div className="learning-paths">
              <h4>Suggested Learning Paths:</h4>
              <ul>
                <li>
                  <a
                    href={learningPaths[skill] || '#'} // Use fetched learning path or '#' while fetching
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSkillClick(skill)} // Fetch learning path when clicked
                  >
                    {learningPaths[skill] ? `Learn ${skill} here` : `Fetch learning path for ${skill}`}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No skills gap available.</p>
      )}

      {/* Display any error messages */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LearningPathDashboard;
