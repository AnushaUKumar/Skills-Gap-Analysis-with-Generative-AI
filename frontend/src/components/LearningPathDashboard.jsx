import React, { useState, useEffect } from 'react';
import './LearningPathDashboard.css';

const LearningPathDashboard = () => {
  const [skillsGap, setSkillsGap] = useState([]);

  // Simulating API call to fetch skills gap and corresponding percentages and learning paths
  const fetchSkillsGap = async () => {
    try {
      const response = await fetch('/api/getSkillsGapWithPaths'); // Adjust with your API endpoint
      const data = await response.json();
      setSkillsGap(data.skills); // Assuming the API returns an array of skills with details
    } catch (error) {
      console.error("Failed to fetch skills gap:", error);
    }
  };

  useEffect(() => {
    fetchSkillsGap();
  }, []); // Fetch skills gap data when the component mounts

  return (
    <div className="learning-path-dashboard">
      <h2>Learning Path Dashboard</h2>

      {skillsGap.length > 0 ? (
        skillsGap.map((skill, index) => (
          <div key={index} className="skill-section">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percentage">{skill.percentage}%</span>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: '${skill.percentage}% '}}
              ></div>
            </div>

            {/* Learning Paths */}
            <div className="learning-paths">
              <h4>Learning Paths:</h4>
              <ul>
                {skill.learningPaths.map((path, idx) => (
                  <li key={idx}>
                    <a href={path.link} target="_blank" rel="noopener noreferrer">
                      {path.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No skills gap available.</p>
      )}
    </div>
  );
};

export default LearningPathDashboard;