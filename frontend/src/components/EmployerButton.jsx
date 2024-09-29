import React, { useState } from 'react';
import './EmployerButton.css';

const EmployerButton = () => {
  const [skillsInput, setSkillsInput] = useState(''); // For the input field
  const [skillsList, setSkillsList] = useState([]); // To store the skills the employer enters

  // Handle the input change for skills
  const handleInputChange = (e) => {
    setSkillsInput(e.target.value);
  };

  // Handle the addition of a skill
  const handleAddSkill = () => {
    if (skillsInput.trim()) {
      setSkillsList([...skillsList, skillsInput]);
      setSkillsInput(''); // Reset the input field
    }
  };

  return (
    <div className="employer-section">
      <h2>Employer Dashboard</h2>
      
      <h3>What skills are you looking for in the next 6 months?</h3>

      {/* Text area for employer to add skills */}
      <textarea
        value={skillsInput}
        onChange={handleInputChange}
        placeholder="Enter skills you're looking for..."
      />

      {/* Button to add skill */}
      <button onClick={handleAddSkill} className="add-skill-button">
        Add Skill
      </button>

      {/* Displaying the list of skills */}
      {skillsList.length > 0 && (
        <div className="skills-list">
          <h4>Skills List</h4>
          <ul>
            {skillsList.map((skill, index) => (
              <li key={index} className="skill-item">{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployerButton;
