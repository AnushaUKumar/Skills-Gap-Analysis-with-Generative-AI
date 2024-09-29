import React from 'react';

import EmployerButton from './components/EmployerButton'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import JobSeekerFlow from './components/JobSeekerFlow';
import EducatorFlow from './components/EducatorFlow';
import DashboardSeeker from './components/DashboardSeeker';
import DashboardEducator from './components/DashboardEducator';
import TargetRolePage from './components/TargetRolePage'; // Import the new component
import LearningPathDashboard from './components/LearningPathDashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/job-seeker" element={<TargetRolePage />} /> {/* New route */}
        <Route path="/job-seeker-dashboard" element={<DashboardSeeker />} />
        <Route path="/job-seeker-flow" element={<JobSeekerFlow />} />
        <Route path="/educator" element={<EducatorFlow />} />
        <Route path="/educator-dashboard" element={<DashboardEducator />} />
        <Route path="/employer" element={<EmployerButton />} /> {/* Add new route for Employer */}
        <Route path="/learning-paths" element={<LearningPathDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
