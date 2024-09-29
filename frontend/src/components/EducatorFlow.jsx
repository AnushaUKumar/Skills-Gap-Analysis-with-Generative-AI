import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EducatorFlow.css'; // Importing CSS for styling

const EducatorFlow = () => {
  const [curriculum, setCurriculum] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCurriculumChange = (e) => {
    setCurriculum(e.target.value); // Allow typing in the textarea
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call to post the curriculum description
      const response = await axios.post(
        'http://127.0.0.1:5000/educator_gap',
        { description: curriculum },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const recommendations = response.data;

      // Redirect to DashboardEducator and pass recommendations via state
      navigate('/educator-dashboard', { state: { recommendations } });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="educator-flow-container">
      <h1>Educator Curriculum Submission</h1>
      <form onSubmit={handleSubmit} className="educator-form">
        <h3>Enter Your Curriculum Details</h3>
        <textarea
          placeholder="Describe your curriculum, teaching experience, or any specific details"
          value={curriculum}
          onChange={handleCurriculumChange}
          rows="6"
          cols="60"
          className="curriculum-input"
        />
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default EducatorFlow;
