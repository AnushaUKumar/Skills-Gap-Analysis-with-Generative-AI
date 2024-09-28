import React, { useState } from 'react';
import { compareCurriculum } from '../services/api';

const EducatorFlow = () => {
  const [curriculum, setCurriculum] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const handleCurriculumChange = (e) => {
    setCurriculum(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await compareCurriculum(curriculum);
      setRecommendations(response.data.recommendations);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Educator Flow</h1>
      <textarea placeholder="Describe your curriculum" onChange={handleCurriculumChange} />
      <button onClick={handleSubmit}>Submit</button>

      <div>
        <h2>Curriculum Recommendations</h2>
        <p>{recommendations}</p>
      </div>
    </div>
  );
};

export default EducatorFlow;
