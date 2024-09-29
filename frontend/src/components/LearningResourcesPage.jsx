import React from 'react';
import { useLocation } from 'react-router-dom';

const LearningResourcesPage = () => {
  const location = useLocation();
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
    </div>
  );
};

export default LearningResourcesPage;
