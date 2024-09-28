import React from 'react';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import JobSeekerFlow from './components/JobSeekerFlow';
import EducatorFlow from './components/EducatorFlow';
import DashboardSeeker from './components/DashboardSeeker';
import DashboardEducator from './components/DashboardEducator';
import TargetRolePage from './components/TargetRolePage'; // Import the new component
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/job-seeker" element={<TargetRolePage />} /> {/* New route */}
        <Route path="/job-seeker-dashboard" element={<DashboardSeeker />} />
        <Route path="/educator" element={<EducatorFlow />} />
        <Route path="/educator-dashboard" element={<DashboardEducator />} />
      </Routes>
    </Router>
  );
}

export default App;
