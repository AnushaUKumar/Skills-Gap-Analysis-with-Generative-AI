import React from 'react';
import { useLocation } from 'react-router-dom';
import './DashboardEducator.css'; // Importing CSS for styling

const DashboardEducator = () => {
  const location = useLocation();
  const { recommendations } = location.state || {};

  if (!recommendations) {
    return <p>No data available. Please submit your curriculum again.</p>;
  }

  return (
    <div className="dashboard-section">
      <h2>Educator Dashboard</h2>
      <div className="extracted-data">
        <h3>Analysed Data</h3>
        <p><strong>Skills:</strong></p>
        <div className="skills-list">
          {recommendations.extracted_data.skills.map((skill, index) => (
            <span key={index} className="skill-button">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <h3>Job Suggestions</h3>
      <div className="suggestions">
        {recommendations.suggestions.map((jobSuggestion, index) => (
          <div key={index} className="suggestion-card">
            <h4>Job: {jobSuggestion.job}</h4>
            <p><strong>Missing Skills:</strong></p>
            <div className="skills-gap">
              {jobSuggestion.missing_skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-gap">
                  {skill}
                </span>
              ))}
            </div>
            <p><strong>Suggestion:</strong> {jobSuggestion.suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardEducator;
