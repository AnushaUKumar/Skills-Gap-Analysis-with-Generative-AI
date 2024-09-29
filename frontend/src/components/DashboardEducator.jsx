
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './DashboardEducator.css';

// const DashboardEducator = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { recommendations } = location.state || {};
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Function to fetch curriculum plan for multiple languages/skills
//   const fetchCurriculumPlan = async (skills) => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`http://localhost:5000/curriculum_plan?language=${encodeURIComponent(skills)}`);
//       const data = await response.json();

//       if (response.ok) {
//         return data; // Return fetched curriculum plan
//       } else {
//         setError(`Failed to fetch curriculum: ${data.error}`);
//         return [];
//       }
//     } catch (err) {
//       setError(`Error occurred: ${err.message}`);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle job click, extract missing skills and pass them as a comma-separated string
//   const handleJobClick = async (jobSuggestion) => {
//     const missingSkills = jobSuggestion.missing_skills.join(', ');
//     const curriculumPlan = await fetchCurriculumPlan(missingSkills); // Fetch curriculum

//     // Navigate to the CurriculumPage with curriculum plan
//     navigate('/curriculum', { state: { curriculumPlan } });
//   };

//   if (!recommendations) {
//     return <p>No data available. Please submit your curriculum again.</p>;
//   }

//   return (
//     <div className="dashboard-educator-page">
//       <div className="dashboard-educator-container">
//         <h2 className="dashboard-header">Educator Dashboard</h2>

//         <div className="dashboard-content">
//           {/* Left Section for Analysed Data */}
//           <div className="dashboard-card analysed-data">
//             <h3>Analysed Data</h3>
//             <p><strong>Skills:</strong></p>
//             <div className="skills-list">
//               {recommendations.extracted_data.skills.map((skill, index) => (
//                 <span key={index} className="skill-tag">
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Right Section for Job Suggestions */}
//           <div className="dashboard-card job-suggestions">
//             <h3>Job Suggestions</h3>
//             {recommendations.suggestions.map((jobSuggestion, index) => (
//               <div key={index} className="suggestion-item" onClick={() => handleJobClick(jobSuggestion)}>
//                 <h4>Job: {jobSuggestion.job}</h4>
//                 <p><strong>Missing Skills:</strong></p>
//                 <div className="missing-skills">
//                   {jobSuggestion.missing_skills.map((skill, skillIndex) => (
//                     <span key={skillIndex} className="missing-skill-tag">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//                 <p><strong>Suggestion:</strong> {jobSuggestion.suggestion}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Loading/Error Section */}
//         {loading && <p>Loading curriculum...</p>}
//         {error && <p className="error-message">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default DashboardEducator;
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DashboardEducator.css';

const DashboardEducator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendations } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch curriculum plan for multiple languages/skills
  const fetchCurriculumPlan = async (skills) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/curriculum_plan?language=${encodeURIComponent(skills)}`);
      const data = await response.json();

      if (response.ok) {
        return data; // Return fetched curriculum plan
      } else {
        setError(`Failed to fetch curriculum: ${data.error}`);
        return [];
      }
    } catch (err) {
      setError(`Error occurred: ${err.message}`);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Handle job click, extract missing skills and pass them as a comma-separated string
  const handleJobClick = async (jobSuggestion) => {
    const missingSkills = jobSuggestion.missing_skills.join(', ');
    const curriculumPlan = await fetchCurriculumPlan(missingSkills); // Fetch curriculum

    // Navigate to the CurriculumPage with curriculum plan
    navigate('/curriculum', { state: { curriculumPlan } });
  };

  if (!recommendations) {
    return <p>No data available. Please submit your curriculum again.</p>;
  }

  return (
    <div className="dashboard-educator-page">
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
              <div key={index} className="suggestion-item" onClick={() => handleJobClick(jobSuggestion)}>
                <h4>Job: {jobSuggestion.job}</h4>
                <p className="missing-skills-label"><strong>Missing Skills:</strong></p>
                <div className="missing-skills">
                  {jobSuggestion.missing_skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="missing-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="suggestion-text"><strong>Suggestion:</strong> {jobSuggestion.suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Loading/Error Section */}
        {loading && <p>Loading curriculum...</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default DashboardEducator;
