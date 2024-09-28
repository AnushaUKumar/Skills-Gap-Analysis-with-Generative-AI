
// import React, { useState } from 'react';

// function TargetRolePage() {
//   const [roleType, setRoleType] = useState(null);
//   const [selectedRole, setSelectedRole] = useState('');
//   const [roleInfo, setRoleInfo] = useState('');
//   const [detailedInfo, setDetailedInfo] = useState('');
//   const [showMore, setShowMore] = useState(false);

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
//   };

//   const handleShowMore = () => {
//     setShowMore(true);
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
//       </div>
//     </div>
//   );
// }

// export default TargetRolePage;


import React, { useState } from 'react';

function TargetRolePage() {
  const [roleType, setRoleType] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [roleInfo, setRoleInfo] = useState('');
  const [detailedInfo, setDetailedInfo] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [finalizedRole, setFinalizedRole] = useState('');

  // Technical subcategories and roles with brief descriptions
  const technicalCategories = {
    'Data & Analytics': [
      { name: 'Data Scientist', description: 'Data Scientists analyze complex data to help organizations make informed decisions.', detailed: 'They use statistical methods, machine learning, and algorithms to gain insights from data.' },
      { name: 'Data Engineer', description: 'Data Engineers build and maintain data pipelines and infrastructure.', detailed: 'They ensure data is available, secure, and optimized for analytical and operational use cases.' },
      // Add more roles as needed...
    ],
    // Add more technical categories...
  };

  // Non-Technical subcategories and roles with brief descriptions
  const nonTechnicalCategories = {
    'Product Management': [
      { name: 'Product Manager', description: 'Product Managers oversee product development from concept to delivery.', detailed: 'They collaborate with teams to design, test, and launch products, ensuring they meet customer needs.' },
      // Add more roles as needed...
    ],
    // Add more non-technical categories...
  };

  const handleRoleSelection = (role, description, detailed) => {
    setSelectedRole(role);
    setRoleInfo(description);
    setDetailedInfo(detailed);
    setShowMore(false);  // Reset showMore when selecting a new role
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const finalizeRole = () => {
    setFinalizedRole(selectedRole);
  };

  return (
    <div>
      <h2>Select Your Target Role</h2>
      {!roleType && (
        <div>
          <button onClick={() => setRoleType('technical')}>Technical</button>
          <button onClick={() => setRoleType('nonTechnical')}>Non-Technical</button>
        </div>
      )}

      {roleType === 'technical' && (
        <div>
          <h3>Select a Technical Subcategory</h3>
          {Object.keys(technicalCategories).map((category) => (
            <div key={category}>
              <h4>{category}</h4>
              {technicalCategories[category].map(({ name, description, detailed }) => (
                <button key={name} onClick={() => handleRoleSelection(name, description, detailed)}>
                  {name}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {roleType === 'nonTechnical' && (
        <div>
          <h3>Select a Non-Technical Subcategory</h3>
          {Object.keys(nonTechnicalCategories).map((category) => (
            <div key={category}>
              <h4>{category}</h4>
              {nonTechnicalCategories[category].map(({ name, description, detailed }) => (
                <button key={name} onClick={() => handleRoleSelection(name, description, detailed)}>
                  {name}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {selectedRole && (
        <div style={{ marginTop: '20px' }}>
          <h4>Your Selected Role:</h4>
          <p><strong>{selectedRole}</strong></p>
          <p>{roleInfo}</p>
          {!showMore && <button onClick={handleShowMore}>Know more</button>}
          {showMore && <p>{detailedInfo}</p>}

          <button onClick={finalizeRole}>Finalize Role</button>
        </div>
      )}

      {finalizedRole && (
        <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
          <h4>Finalized Role:</h4>
          <p><strong>{finalizedRole}</strong></p>
        </div>
      )}
    </div>
  );
}

export default TargetRolePage;
