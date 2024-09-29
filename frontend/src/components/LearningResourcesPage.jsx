import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LearningResourcesPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate for the back button
  const { resources = [] } = location.state || {}; // Get resources from navigation state

  return (
    <div>
      <h2>Recommended Learning Resources</h2>
      {resources.length > 0 ? (
        <ul>
          {resources.map((resource, index) => (
            <li key={index}>
              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                {resource.link}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No resources available.</p>
      )}

      {/* Back Button to return to the Learning Path Dashboard */}
      <button onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>
        Back to Learning Path Dashboard
      </button>
    </div>
  );
};

export default LearningResourcesPage;
