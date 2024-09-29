// import React, { useState } from 'react';
// import axios from 'axios'; // Make sure axios is installed and imported for API calls

// function JobSeekerFlow() {
//   const [resumeFile, setResumeFile] = useState(null); // To store the uploaded file
//   const [description, setDescription] = useState(''); // To store the entered description
//   const [loading, setLoading] = useState(false); // Loading state to handle form submission
//   const [message, setMessage] = useState(''); // To store success/error messages

//   // Handle resume file change
//   const handleFileChange = (event) => {
//     setResumeFile(event.target.files[0]); // Get the uploaded file
//   };

//   // Handle description text change
//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value); // Get the entered description
//   };

//   // Function to handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setMessage(''); // Clear previous messages

//     try {
//       if (resumeFile) {
//         // Call the API for resume parsing
//         const formData = new FormData();
//         formData.append('resume', resumeFile);

//         const response = await axios.post('http://localhost:5000/parse_resume', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         console.log('Resume Parsing Result:', response.data);
//         setMessage(`Resume parsed successfully: ${JSON.stringify(response.data)}`);
//       } else if (description) {
//         // Call the API for description analysis
//         const response = await axios.post(
//           'http://127.0.0.1:5000/analyze_description',
//           { description: description },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         console.log('Description Analysis Result:', response.data);
//         setMessage(`Description analyzed successfully: ${JSON.stringify(response.data)}`);
//       } else {
//         setMessage('Please upload a resume or enter a description!');
//         alert('Please upload a resume or enter a description!');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setMessage(`Error occurred: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Job Seeker Flow</h1>
//       <form onSubmit={handleSubmit}>
//         {/* Resume Upload */}
//         <input type="file" onChange={handleFileChange} />
        
//         {/* Description Text */}
//         <textarea
//           value={description}
//           onChange={handleDescriptionChange}
//           placeholder="Describe your past experiences"
//         />
        
//         {/* Submit Button */}
//         <button type="submit" disabled={loading}>
//           {loading ? 'Submitting...' : 'Submit'}
//         </button>
//       </form>

//       {/* Display success or error messages */}
//       {message && (
//         <div style={{ marginTop: '20px', color: message.startsWith('Error') ? 'red' : 'green' }}>
//           {message}
//         </div>
//       )}
//     </div>
//   );
// }

// export default JobSeekerFlow;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "./JobSeekerFlow.css";

// const JobSeekerFlow = () => {
//   const [resume, setResume] = useState(null);
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleResumeChange = (e) => {
//     setResume(e.target.files[0]);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       let parsedData;
//       if (resume) {
//         // API call for resume parsing
//         const formData = new FormData();
//         formData.append('resume', resume);

//         const response = await axios.post('http://localhost:5000/parse_resume', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         parsedData = response.data;
//         console.log('Resume Parsing Result:', parsedData);

//       } else if (description) {
//         // API call for description analysis
//         const response = await axios.post(
//           'http://127.0.0.1:5000/analyze_description',
//           { description },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         parsedData = response.data;
//         console.log('Description Analysis Result:', parsedData);
//       } else {
//         setMessage('Please upload a resume or enter a description.');
//         alert('Please upload a resume or enter a description!');
//         return;
//       }

//       // Check if parsed skills exist
//       if (parsedData.skills) {
//         // Navigate to the dashboard and pass skills to DashboardSeeker.jsx
//         navigate('/job-seeker-dashboard', { state: { userSkills: parsedData.skills, targetRoleSkills: parsedData.targetRoleSkills || [] } });
//       } else {
//         setMessage('No skills found.');
//       }
      
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setMessage(`Error occurred: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="job-seeker-flow-container">
//   <h1>Job Seeker Flow</h1>
//   <form onSubmit={handleSubmit}>
//     <h3>Upload your resume</h3>
//     <div className="file-input-container">
//       <input type="file" onChange={handleResumeChange} />
//     </div>

//     <h3>Or tell about your past experiences</h3>
//     <textarea
//       placeholder="Describe your past experiences"
//       value={description}
//       onChange={handleDescriptionChange}
//     />

//     <button type="submit" disabled={loading}>
//       {loading ? 'Submitting...' : 'Submit'}
//     </button>
//   </form>

//   {message && (
//     <div
//       style={{
//         marginTop: '20px',
//         color: message.startsWith('Error') ? 'red' : 'green',
//       }}
//     >
//       {message}
//     </div>
//   )}
// </div>

//   );
// };

// export default JobSeekerFlow;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation to receive targetRole
import "./JobSeekerFlow.css";

const JobSeekerFlow = () => {
  const [resume, setResume] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Retrieve the targetRole from location state (sent from TargetRolePage)
  const location = useLocation();
  const targetRole = location.state?.targetRole || ''; // Use targetRole from the previous step

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let parsedData;
      if (resume) {
        // API call to parse the resume
        const formData = new FormData();
        formData.append('resume', resume);

        const response = await axios.post('http://localhost:5000/parse_resume', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        parsedData = response.data;
        console.log('Resume Parsing Result:', parsedData);

      } else if (description) {
        // API call to analyze the description
        const response = await axios.post(
          'http://127.0.0.1:5000/analyze_description',
          { description },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        parsedData = response.data;
        console.log('Description Analysis Result:', parsedData);
      } else {
        setMessage('Please upload a resume or enter a description.');
        alert('Please upload a resume or enter a description!');
        setLoading(false);
        return;
      }

      // Check if parsed skills are available
      if (parsedData.skills) {
        // Navigate to the DashboardSeeker page, pass user skills and targetRole
        navigate('/job-seeker-dashboard', { 
          state: { 
            userSkills: parsedData.skills, 
            targetRole: targetRole, // Pass targetRole to the next page
            targetRoleSkills: parsedData.targetRoleSkills || [] 
          } 
        });
      } else {
        setMessage('No skills found.');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage(`Error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-seeker-flow-container">
      <h1>Job Seeker Flow</h1>
      <form onSubmit={handleSubmit}>
        <h3>Upload your resume</h3>
        <div className="file-input-container">
          <input type="file" onChange={handleResumeChange} />
        </div>

        <h3>Or tell about your past experiences</h3>
        <textarea
          placeholder="Describe your past experiences"
          value={description}
          onChange={handleDescriptionChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {message && (
        <div
          style={{
            marginTop: '20px',
            color: message.startsWith('Error') ? 'red' : 'green',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default JobSeekerFlow;
