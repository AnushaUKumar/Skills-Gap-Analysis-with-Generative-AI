// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import "./DashboardSeeker.css";

// const DashboardSeeker = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { userSkills = [], targetRoleSkills = [] } = location.state || {};

//   const [selectedSkills, setSelectedSkills] = useState(userSkills); 
//   const [newSkill, setNewSkill] = useState('');
//   const [skillsGap, setSkillsGap] = useState([]); 
//   const [showSkillsGap, setShowSkillsGap] = useState(false); 

//   useEffect(() => {
//     const gap = targetRoleSkills.filter(skill => !selectedSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase()));
//     setSkillsGap(gap);
//   }, [selectedSkills, targetRoleSkills]);

//   const handleAddSkill = (e) => {
//     if (e.key === 'Enter' && newSkill.trim()) {
//       setSelectedSkills([...selectedSkills, newSkill]);
//       setNewSkill(''); 
//     }
//   };

//   const handleRemoveSkill = (skill) => {
//     setSelectedSkills(selectedSkills.filter(s => s !== skill));
//   };

//   const handleNext = () => {
//     setShowSkillsGap(true); 
//   };

//   const handleExploreLearningPaths = () => {
//     navigate('/learning-paths', { state: { skillsGap } });
//   };

//   return (
//     <div className="dashboard-section">
//       <h2>Job Seeker Dashboard</h2>

//       <div>
//         <h3>Your Skills</h3>
//         <div>
//           {selectedSkills.map((skill, index) => (
//             <span key={index} className="skill-button">
//               {skill} 
//               <button onClick={() => handleRemoveSkill(skill)}>×</button>
//             </span>
//           ))}
//         </div>
//         <input
//           type="text"
//           value={newSkill}
//           placeholder="Add new skill"
//           onChange={(e) => setNewSkill(e.target.value)}
//           onKeyDown={handleAddSkill} 
//         />
//       </div>

//       {selectedSkills.length > 0 && (
//         <button className="cta-button" onClick={handleNext}>Next</button>
//       )}

//       {showSkillsGap && (
//         <div className="skills-gap">
//           <h3>Skills Gap</h3>
//           <div>
//             {skillsGap.length > 0 ? (
//               skillsGap.map((skill, index) => (
//                 <span key={index}>{skill}</span>
//               ))
//             ) : (
//               <span>No skills gap.</span>
//             )}
//           </div>
//           <button className="cta-button" onClick={handleExploreLearningPaths}>Explore Learning Paths</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashboardSeeker;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./DashboardSeeker.css";

const DashboardSeeker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Fetching targetRole from the previous page (TargetRolePage)
  const { userSkills = [], targetRoleSkills = [], targetRole } = location.state || {};

  const [selectedSkills, setSelectedSkills] = useState(userSkills); 
  const [newSkill, setNewSkill] = useState('');
  const [skillsGap, setSkillsGap] = useState([]); 
  const [showSkillsGap, setShowSkillsGap] = useState(false); 

  useEffect(() => {
    // Calculate the skills gap based on user skills and target role skills
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

  const handleNext = async () => {
    setShowSkillsGap(true);
  
    // Prepare the data for the API call
    const data = {
      role: targetRole, // The role passed from the previous step
      user_skills: selectedSkills, // The skills currently displayed
    };
  
    console.log('role:', targetRole);
    console.log('user_skills:', selectedSkills);
  
    try {
      // Make the API call
      const response = await axios.post('http://127.0.0.1:5000/analyze_skills', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check the response status
      console.log('API Response Status:', response.status);
      console.log('API Response Data:', response.data);
  
      // Check if the API response is a valid JSON
      if (response.status === 200 && typeof response.data === 'object') {
        console.log('API response:', response.data);
  
        if (response.data.missing_skills) {
          alert('Skills and role successfully saved!');
          // Navigate to the learning paths page with the skills gap data
          navigate('/learning-paths', { state: { skillsGap: response.data.missing_skills } });
        } else {
          alert('No missing skills found.');
        }
      } else {
        console.error('Invalid API response format');
        alert('Invalid API response received. Check the response format.');
      }
    } catch (error) {
      // Handle HTTP and parsing errors
      console.error('Error making the API request:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
      alert('An error occurred while saving your skills and target role.');
    }
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
