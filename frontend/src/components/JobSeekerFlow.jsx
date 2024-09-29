import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobSeekerFlow = () => {
  const [resume, setResume] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    let userSkills = [];
    let targetRoleSkills = ["SQL", "Python", "Data Visualization", "Machine Learning", "Excel"]; // Mock target role skills

    // Mock backend logic to extract skills
    if (resume) {
      // Simulate extracting skills from resume
      userSkills = ["Excel", "Communication", "Leadership", "Time Management"];
    } else if (description) {
      // Simulate extracting skills from description
      userSkills = ["Leadership", "Communication", "Negotiation"];
    }

    // Mock navigation to Dashboard with extracted skills and target role skills
    navigate('/job-seeker-dashboard', {
      state: {
        userSkills,
        targetRoleSkills
      }
    });
  };

  return (
    <div>
      <h1>Job Seeker Flow</h1>
      <input type="file" onChange={handleResumeChange} />
      <textarea
        placeholder="Describe your past experiences"
        onChange={handleDescriptionChange}
        value={description}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default JobSeekerFlow;