import React from "react";
import "./OfficialTemplate.css";

const OfficialTemplate = ({ personalInfo, education, workExperience, skills, certifications }) => (
  <div className="official-container">
    <aside className="official-sidebar">
      <h1>{personalInfo.fullName}</h1>
      <h2>{personalInfo.jobRole}</h2>
      <p>Email: {personalInfo.email}</p>
      <p>Phone: {personalInfo.phone}</p>
      <p>Location: {personalInfo.address}</p>

      <h3>Skills</h3>
      <ul>
        {skills.map((skill, idx) => (
          <li key={idx}>{skill}</li>
        ))}
      </ul>

      <h3>Certifications</h3>
      <ul>
        {certifications.map((cert, idx) => (
          <li key={idx}>
            <strong>{cert.name}</strong> ({new Date(cert.issueDate).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </aside>
    <main className="official-main">
      <section>
        <h3>Education</h3>
        {education.map((edu, idx) => (
          <div key={idx}>
            <h4>{edu.degree} in {edu.fieldOfStudy}</h4>
            <p>{edu.school}</p>
            <p>{edu.grade}</p>
          </div>
        ))}
      </section>

      <section>
        <h3>Work Experience</h3>
        {workExperience.map((job, idx) => (
          <div key={idx}>
            <h4>{job.role}</h4>
            <p>{job.company}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </section>
    </main>
  </div>
);

export default OfficialTemplate;
