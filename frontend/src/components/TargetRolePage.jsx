
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// function TargetRolePage() {
//   const [roleType, setRoleType] = useState(null);
//   const [selectedRole, setSelectedRole] = useState('');
//   const [roleInfo, setRoleInfo] = useState('');
//   const [detailedInfo, setDetailedInfo] = useState('');
//   const [showMore, setShowMore] = useState(false);
//   const [confirmedRole, setConfirmedRole] = useState('');

//   const navigate = useNavigate(); // Create a navigate instance

//   // Technical subcategories and roles with brief descriptions
//   const technicalCategories = {
//     'Data & Analytics': [
//       { name: 'Data Scientist', description: 'Data Scientists analyze complex data to help organizations make informed decisions.', detailed: 'They use statistical methods, machine learning, and algorithms to gain insights from data.' },
//       { name: 'Data Engineer', description: 'Data Engineers build and maintain data pipelines and infrastructure.', detailed: 'They ensure data is available, secure, and optimized for analytical and operational use cases.' },
//       { name: 'Business Intelligence Analyst', description: 'BI Analysts focus on analyzing data to provide actionable business insights.' },
//       { name: 'Machine Learning Engineer', description: 'Machine Learning Engineers build AI systems that can learn and make decisions.' },
//     ],
//     'Software Development': [
//       { name: 'Frontend Developer', description: 'Frontend Developers build the visual and interactive parts of websites.' },
//       { name: 'Backend Developer', description: 'Backend Developers handle server-side logic and databases.' },
//       { name: 'Full Stack Developer', description: 'Full Stack Developers work on both the front and back end of a website or app.' },
//       { name: 'Mobile App Developer', description: 'Mobile App Developers create apps for mobile devices like smartphones and tablets.' },
//     ],
//     'Cloud & Infrastructure': [
//       { name: 'Cloud Engineer', description: 'Cloud Engineers design and manage cloud-based infrastructure and services.' },
//       { name: 'DevOps Engineer', description: 'DevOps Engineers work on improving collaboration between development and IT operations.' },
//       { name: 'Network Architect', description: 'Network Architects design and build data communication networks.' },
//       { name: 'Systems Administrator', description: 'Systems Administrators manage and maintain IT infrastructure.' },
//     ],
//     'Cybersecurity': [
//       { name: 'Security Analyst', description: 'Security Analysts monitor and protect systems from cyber threats.' },
//       { name: 'Security Engineer', description: 'Security Engineers develop systems to safeguard data and infrastructure.' },
//       { name: 'Penetration Tester', description: 'Penetration Testers attempt to breach systems to identify vulnerabilities.' },
//       { name: 'Security Architect', description: 'Security Architects design security structures for IT systems.' },
//     ],
//     'AI & Machine Learning': [
//       { name: 'AI Engineer', description: 'AI Engineers design AI models that simulate human intelligence.' },
//       { name: 'Machine Learning Scientist', description: 'ML Scientists focus on developing new algorithms for machine learning.' },
//       { name: 'NLP Engineer', description: 'NLP Engineers work on developing systems that understand and process human language.' },
//       { name: 'AI Researcher', description: 'AI Researchers investigate new ways of building and applying AI systems.' },
//     ],
//   };

//   // Non-Technical subcategories and roles with brief descriptions
//   const nonTechnicalCategories = {
//     'Product Management': [
//       { name: 'Product Manager', description: 'Product Managers oversee product development from concept to delivery.', detailed: 'They collaborate with teams to design, test, and launch products, ensuring they meet customer needs.' },
//       { name: 'Technical Product Manager', description: 'Technical Product Managers focus on the technical aspects of product development.' },
//       { name: 'Product Owner', description: 'Product Owners manage the product backlog and prioritize tasks for the team.' },
//     ],
//     'Project & Program Management': [
//       { name: 'Project Manager', description: 'Project Managers plan and execute projects within scope, time, and budget.' },
//       { name: 'Program Manager', description: 'Program Managers oversee multiple related projects to ensure alignment with business goals.' },
//       { name: 'Scrum Master', description: 'Scrum Masters facilitate agile development teams to ensure smooth processes.' },
//     ],
//     'Sales & Marketing': [
//       { name: 'Sales Engineer', description: 'Sales Engineers provide technical expertise to help sell complex products.' },
//       { name: 'Digital Marketing Specialist', description: 'Digital Marketing Specialists manage online marketing campaigns to promote products or services.' },
//       { name: 'SEO Specialist', description: 'SEO Specialists improve website rankings in search engines through optimization strategies.' },
//     ],
//     'Human Resources & Talent Acquisition': [
//       { name: 'HR Manager', description: 'HR Managers oversee recruitment, employee relations, and organizational policies.' },
//       { name: 'Talent Acquisition Specialist', description: 'Talent Acquisition Specialists focus on finding and recruiting top talent.' },
//       { name: 'Training and Development Manager', description: 'Training Managers design programs to enhance employees’ skills and career development.' },
//     ],
//     'Customer Success & Support': [
//       { name: 'Customer Success Manager', description: 'Customer Success Managers help clients achieve their goals with the product or service.' },
//       { name: 'Technical Support Specialist', description: 'Technical Support Specialists assist customers with technical problems or queries.' },
//       { name: 'Customer Support Representative', description: 'Customer Support Reps address customer inquiries and resolve issues.' },
//     ],
//   };

//   const handleRoleSelection = (role, description, detailed) => {
//     setSelectedRole(role);
//     setRoleInfo(description);
//     setDetailedInfo(detailed);
//     setShowMore(false);  // Reset showMore when selecting a new role
//     setConfirmedRole(''); // Clear confirmed role when a new role is selected
//   };

//   const handleShowMore = () => {
//     setShowMore(true);
//   };

//   const handleConfirmRole = () => {
//     setConfirmedRole(selectedRole);
//   };

//   const handleNext = () => {
//     navigate('/job-seeker-flow'); // Navigate to the JobSeekerFlow page
//   };

//   return (
//     <div>
//       <h2>Select Your Target Role</h2>
//       {!roleType && (
//         <div>
//           <button onClick={() => setRoleType('technical')}>Technical</button>
//           <button onClick={() => setRoleType('nonTechnical')}>Non-Technical</button>
//         </div>
//       )}

//       {roleType === 'technical' && (
//         <div>
//           <h3>Select a Technical Subcategory</h3>
//           {Object.keys(technicalCategories).map((category) => (
//             <div key={category}>
//               <h4>{category}</h4>
//               {technicalCategories[category].map(({ name, description, detailed }) => (
//                 <button key={name} onClick={() => handleRoleSelection(name, description, detailed)}>
//                   {name}
//                 </button>
//               ))}
//             </div>
//           ))}
//         </div>
//       )}

//       {roleType === 'nonTechnical' && (
//         <div>
//           <h3>Select a Non-Technical Subcategory</h3>
//           {Object.keys(nonTechnicalCategories).map((category) => (
//             <div key={category}>
//               <h4>{category}</h4>
//               {nonTechnicalCategories[category].map(({ name, description, detailed }) => (
//                 <button key={name} onClick={() => handleRoleSelection(name, description, detailed)}>
//                   {name}
//                 </button>
//               ))}
//             </div>
//           ))}
//         </div>
//       )}

//       <div style={{ marginTop: '20px' }}>
//         {roleInfo && (
//           <div>
//             <h4>Role Description:</h4>
//             <p>{roleInfo}</p>
//             {!showMore && <button onClick={handleShowMore}>Know more</button>}
//             {showMore && <p>{detailedInfo}</p>}
//           </div>
//         )}

//         {selectedRole && !confirmedRole && (
//           <div>
//             <button onClick={handleConfirmRole}>Confirm Role: {selectedRole}</button>
//           </div>
//         )}

//         {confirmedRole && (
//           <div>
//             <h4>You have confirmed the role: {confirmedRole}</h4>
//             <button onClick={handleNext}>Next</button> {/* Add Next button */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TargetRolePage;
// import React, { useState } from 'react';
// import './TargetRolePage.css'; // Import your styles

// function TargetRolePage() {
//   const [roleType, setRoleType] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [selectedRole, setSelectedRole] = useState('');

//   // Technical and Non-Technical Descriptions
//   const roleTypeDescriptions = {
//     technical: 'Explore careers focused on technology and innovation. This includes software development, AI, data science, and more.',
//     nonTechnical: 'Explore careers focused on management, marketing, customer success, and other business-related roles.',
//   };

//   // Technical subcategories and roles with brief descriptions
//   const technicalCategories = {
//     'Data & Analytics': [
//       { name: 'Data Scientist', description: 'Analyze complex data to help organizations make informed decisions.' },
//       { name: 'Data Engineer', description: 'Build and maintain data pipelines and infrastructure.' },
//     ],
//     'Software Development': [
//       { name: 'Frontend Developer', description: 'Build the visual and interactive parts of websites.' },
//       { name: 'Backend Developer', description: 'Handle server-side logic and databases.' },
//     ],
//     // Add more categories...
//   };

//   // Non-Technical subcategories and roles with brief descriptions
//   const nonTechnicalCategories = {
//     'Product Management': [
//       { name: 'Product Manager', description: 'Oversee product development from concept to delivery.' },
//     ],
//     'Sales & Marketing': [
//       { name: 'Sales Engineer', description: 'Provide technical expertise to help sell complex products.' },
//     ],
//     // Add more categories...
//   };

//   const handleRoleTypeSelection = (type) => {
//     setRoleType(type);
//     setSelectedSubcategory(null); // Reset subcategory when switching between role types
//   };

//   const handleSubcategorySelection = (subcategory) => {
//     setSelectedSubcategory(subcategory);
//     setSelectedRole(''); // Reset role when switching subcategories
//   };

//   const handleRoleSelection = (role) => {
//     setSelectedRole(role);
//   };

//   return (
//     <div className="role-page-container">
//       <h2>Select Your Target Role</h2>

//       {/* Show the main cards for Technical and Non-Technical */}
//       {!roleType && (
//         <div className="role-cards">
//           <div className="role-card" onClick={() => handleRoleTypeSelection('technical')}>
//             <h3>Technical</h3>
//             <p>{roleTypeDescriptions.technical}</p>
//           </div>
//           <div className="role-card" onClick={() => handleRoleTypeSelection('nonTechnical')}>
//             <h3>Non-Technical</h3>
//             <p>{roleTypeDescriptions.nonTechnical}</p>
//           </div>
//         </div>
//       )}

//       {/* Show the subcategories based on the selected role type */}
//       {roleType === 'technical' && !selectedSubcategory && (
//         <div className="subcategory-cards">
//           {Object.keys(technicalCategories).map((category) => (
//             <div className="subcategory-card" key={category} onClick={() => handleSubcategorySelection(category)}>
//               <h4>{category}</h4>
//               <p>{`Explore roles in ${category}`}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {roleType === 'nonTechnical' && !selectedSubcategory && (
//         <div className="subcategory-cards">
//           {Object.keys(nonTechnicalCategories).map((category) => (
//             <div className="subcategory-card" key={category} onClick={() => handleSubcategorySelection(category)}>
//               <h4>{category}</h4>
//               <p>{`Explore roles in ${category}`}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Show roles under the selected subcategory */}
//       {selectedSubcategory && (
//         <div className="roles-cards">
//           {(roleType === 'technical' ? technicalCategories[selectedSubcategory] : nonTechnicalCategories[selectedSubcategory])
//             .map(({ name, description }) => (
//               <div className="role-detail-card" key={name} onClick={() => handleRoleSelection(name)}>
//                 <h5>{name}</h5>
//                 <p>{description}</p>
//               </div>
//             ))}
//         </div>
//       )}

//       {/* Show selected role details */}
//       {selectedRole && (
//         <div className="role-info">
//           <h4>You've selected the role: {selectedRole}</h4>
//           <button onClick={() => console.log("Navigate to the next step")}>Next</button> {/* Add navigation logic */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TargetRolePage;
import React, { useState } from 'react';
import './TargetRolePage.css'; // Make sure you have styles for the page

function TargetRolePage() {
  const [roleType, setRoleType] = useState(null); // To store if technical or non-technical is selected
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // To store selected subcategory

  // Technical subcategories and roles
  const technicalCategories = {
    'Data & Analytics': 'Explore roles related to data science, analytics, and more.',
    'Software Development': 'Explore roles in software engineering, web development, and more.',
    'Cloud & Infrastructure': 'Explore roles in cloud engineering, DevOps, and network administration.',
    'Cybersecurity': 'Explore roles in security analysis, penetration testing, and system protection.',
    'AI & Machine Learning': 'Explore roles in artificial intelligence, machine learning, and natural language processing.'
  };

  // Non-Technical subcategories
  const nonTechnicalCategories = {
    'Product Management': 'Explore roles in product management and ownership.',
    'Project & Program Management': 'Explore roles in project and program management.',
    'Sales & Marketing': 'Explore roles in sales, digital marketing, and SEO.',
    'Human Resources & Talent Acquisition': 'Explore roles in HR and talent acquisition.',
    'Customer Success & Support': 'Explore roles in customer success and technical support.'
  };

  const handleRoleTypeSelection = (type) => {
    setRoleType(type); // Set the role type (technical or non-technical)
    setSelectedSubcategory(null); // Reset subcategory when switching between role types
  };

  const handleSubcategorySelection = (subcategory) => {
    setSelectedSubcategory(subcategory); // Store selected subcategory
  };

  return (
    <div className="role-page-container">
      <h2>Select Your Target Role</h2>

      {/* Main cards for selecting Technical or Non-Technical */}
      {!roleType && (
        <div className="role-cards">
          <div className="role-card" onClick={() => handleRoleTypeSelection('technical')}>
            <h3>Technical</h3>
            <p>Explore careers focused on technology and innovation.</p>
          </div>
          <div className="role-card" onClick={() => handleRoleTypeSelection('nonTechnical')}>
            <h3>Non-Technical</h3>
            <p>Explore careers focused on management, marketing, and customer success.</p>
          </div>
        </div>
      )}

      {/* If Technical is selected, show subcategories */}
      {roleType === 'technical' && !selectedSubcategory && (
        <div className="subcategory-cards">
          {Object.keys(technicalCategories).map((category) => (
            <div className="subcategory-card" key={category} onClick={() => handleSubcategorySelection(category)}>
              <h4>{category}</h4>
              <p>{technicalCategories[category]}</p>
            </div>
          ))}
        </div>
      )}

      {/* If Non-Technical is selected, show subcategories */}
      {roleType === 'nonTechnical' && !selectedSubcategory && (
        <div className="subcategory-cards">
          {Object.keys(nonTechnicalCategories).map((category) => (
            <div className="subcategory-card" key={category} onClick={() => handleSubcategorySelection(category)}>
              <h4>{category}</h4>
              <p>{nonTechnicalCategories[category]}</p>
            </div>
          ))}
        </div>
      )}

      {/* Show subcategory details after selection */}
      {selectedSubcategory && (
        <div className="subcategory-detail">
          <h3>{selectedSubcategory}</h3>
          <p>{(roleType === 'technical' ? technicalCategories : nonTechnicalCategories)[selectedSubcategory]}</p>
          {/* Back button to go back to the subcategories */}
          <button onClick={() => setSelectedSubcategory(null)}>Back</button>
        </div>
      )}
    </div>
  );
}

export default TargetRolePage;
