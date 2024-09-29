import React from 'react';
import { useLocation } from 'react-router-dom';
import './CurriculumPage.css';

const CurriculumPage = () => {
  const location = useLocation();
  const { curriculumPlan } = location.state || {};

  if (!curriculumPlan || curriculumPlan.length === 0) {
    return <p>No curriculum data available.</p>;
  }

  return (
    <div className="curriculum-page-container">
      <h2 className="curriculum-header">Recommended Curriculum</h2>
      <ul className="curriculum-list">
        {curriculumPlan.map((item, index) => (
          <li key={index} className="curriculum-item">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <h3>{item.title}</h3>
            </a>
            <p>{item.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurriculumPage;
