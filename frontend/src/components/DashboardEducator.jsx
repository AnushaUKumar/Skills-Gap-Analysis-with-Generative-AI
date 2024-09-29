
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './DashboardEducator.css'; // Importing CSS for styling

// const DashboardEducator = () => {
//   const location = useLocation();
//   const { recommendations } = location.state || {};

//   // Handle click event on a skill tab
//   const handleSkillClick = (skill) => {
//     // You can integrate your Google API search logic here
//     alert(`Searching curriculum plan for: ${skill}`);
//     // Example API call can be placed here
//   };

//   if (!recommendations) {
//     return <p>No data available. Please submit your curriculum again.</p>;
//   }

//   return (
//     <div className="dashboard-section">
//       <h2>Educator Dashboard</h2>

//       <div className="content-section">
//         <div className="extracted-data">
//           <h3>Analysed Data</h3>
//           <p><strong>Skills:</strong></p>
//           <div className="skills-list">
//             {recommendations.extracted_data.skills.map((skill, index) => (
//               <span 
//                 key={index} 
//                 className="skill-button" 
//                 onClick={() => handleSkillClick(skill)}
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="job-suggestions">
//           <h3>Job Suggestions</h3>
//           <div className="suggestions">
//             {recommendations.suggestions.map((jobSuggestion, index) => (
//               <div key={index} className="suggestion-card">
//                 <h4>Job: {jobSuggestion.job}</h4>
//                 <p><strong>Missing Skills:</strong></p>
//                 <div className="skills-gap">
//                   {jobSuggestion.missing_skills.map((skill, skillIndex) => (
//                     <span key={skillIndex} className="skill-gap">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//                 <p><strong>Suggestion:</strong> {jobSuggestion.suggestion}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardEducator;
import React from 'react';
import { useLocation } from 'react-router-dom';
import './DashboardEducator.css'; // Importing CSS

const DashboardEducator = () => {
  const location = useLocation();
  const { recommendations } = location.state || {};

  if (!recommendations) {
    return <p>No data available. Please submit your curriculum again.</p>;
  }

  return (
    <div className="dashboard-educator-page"> {/* Added unique class for background image */}
      <div className="dashboard-educator-container">
        <h2 className="dashboard-header">Educator Dashboard</h2>

        <div className="dashboard-content">
          {/* Left Section for Analysed Data */}
          <div className="dashboard-card analysed-data">
            <h3>Analysed Data</h3>
            <p><strong>Skills:</strong></p>
            <div className="skills-list">
              {recommendations.extracted_data.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right Section for Job Suggestions */}
          <div className="dashboard-card job-suggestions">
            <h3>Job Suggestions</h3>
            {recommendations.suggestions.map((jobSuggestion, index) => (
              <div key={index} className="suggestion-item">
                <h4>Job: {jobSuggestion.job}</h4>
                <p><strong>Missing Skills:</strong></p>
                <div className="missing-skills">
                  {jobSuggestion.missing_skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="missing-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                <p><strong>Suggestion:</strong> {jobSuggestion.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEducator;
