import React from "react";
import "./ElegantTemplate.css";

const ElegantTemplate = ({ personalInfo, education, workExperience, skills, certifications }) => (
  <div className="elegant-container">
    <header className="elegant-header">
      <h1>{personalInfo.fullName}</h1>
      <h2>{personalInfo.jobRole}</h2>
    </header>

    <section className="elegant-section">
      <h3>Education</h3>
      {education.map((edu, idx) => (
        <div key={idx}>
          <strong>{edu.degree}</strong> - {edu.fieldOfStudy}, {edu.school}
        </div>
      ))}
    </section>

    <section className="elegant-section">
      <h3>Skills</h3>
      <p>{skills.join(", ")}</p>
    </section>

    <section className="elegant-section">
      <h3>Work Experience</h3>
      {workExperience.map((job, idx) => (
        <div key={idx}>
          <h4>{job.role}</h4>
          <p>{job.description}</p>
        </div>
      ))}
    </section>
  </div>
);

export default ElegantTemplate;
