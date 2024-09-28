import React, { useState } from 'react';
import { parseResume, generateCareerPath } from '../services/api';

const JobSeekerFlow = () => {
  const [resume, setResume] = useState(null);
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [careerPath, setCareerPath] = useState('');

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const skillsResponse = await parseResume(resume);
      setSkills(skillsResponse.data.skills);

      const pathResponse = await generateCareerPath(description);
      setCareerPath(pathResponse.data.career_path);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Job Seeker Flow</h1>
      <input type="file" onChange={handleResumeChange} />
      <textarea placeholder="Describe your ideal job role" onChange={handleDescriptionChange} />
      <button onClick={handleSubmit}>Submit</button>

      <div>
        <h2>Extracted Skills</h2>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Career Path</h2>
        <p>{careerPath}</p>
      </div>
    </div>
  );
};

export default JobSeekerFlow;
