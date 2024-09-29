import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./DashboardSeeker.css";

const DashboardSeeker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userSkills = [], targetRoleSkills = [] } = location.state || {};

  const [selectedSkills, setSelectedSkills] = useState(userSkills); 
  const [newSkill, setNewSkill] = useState('');
  const [skillsGap, setSkillsGap] = useState([]); 
  const [showSkillsGap, setShowSkillsGap] = useState(false); 

  useEffect(() => {
    const gap = targetRoleSkills.filter(skill => !selectedSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase()));
    setSkillsGap(gap);
  }, [selectedSkills, targetRoleSkills]);

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      setSelectedSkills([...selectedSkills, newSkill]);
      setNewSkill(''); 
    }
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const handleNext = () => {
    setShowSkillsGap(true); 
  };

  const handleExploreLearningPaths = () => {
    navigate('/learning-paths', { state: { skillsGap } });
  };

  return (
    <div className="dashboard-section">
      <h2>Job Seeker Dashboard</h2>

      <div>
        <h3>Your Skills</h3>
        <div>
          {selectedSkills.map((skill, index) => (
            <span key={index} className="skill-button">
              {skill} 
              <button onClick={() => handleRemoveSkill(skill)}>×</button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={newSkill}
          placeholder="Add new skill"
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleAddSkill} 
        />
      </div>

      {selectedSkills.length > 0 && (
        <button className="cta-button" onClick={handleNext}>Next</button>
      )}

      {showSkillsGap && (
        <div className="skills-gap">
          <h3>Skills Gap</h3>
          <div>
            {skillsGap.length > 0 ? (
              skillsGap.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))
            ) : (
              <span>No skills gap.</span>
            )}
          </div>
          <button className="cta-button" onClick={handleExploreLearningPaths}>Explore Learning Paths</button>
        </div>
      )}
    </div>
  );
};

export default DashboardSeeker;
