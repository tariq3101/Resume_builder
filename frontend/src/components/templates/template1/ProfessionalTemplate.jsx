import React from "react";
import "./ProfessionalTemplate.css";

const ProfessionalTemplate = ({ personalInfo, education, workExperience, skills, certifications }) => (
  <div className="professional-container">
    <header className="professional-header">
      <h1>{personalInfo.fullName}</h1>
      <h2>{personalInfo.jobRole}</h2>
      <div className="contact-info">
        <p>Email: {personalInfo.email}</p>
        <p>Phone: {personalInfo.phone}</p>
        <p>Address: {personalInfo.address}</p>
      </div>
    </header>

    <section className="professional-section">
      <h3>Work Experience</h3>
      {workExperience.map((job, idx) => (
        <div key={idx} className="professional-work">
          <h4>{job.role} - {job.company}</h4>
          <p>{job.description}</p>
          <p>
            <em>
              {new Date(job.startDate).toLocaleDateString()} - {job.endDate ? new Date(job.endDate).toLocaleDateString() : "Present"}
            </em>
          </p>
        </div>
      ))}
    </section>

    <section className="professional-section">
      <h3>Education</h3>
      <ul>
        {education.map((edu, idx) => (
          <li key={idx}>
            <strong>{edu.degree}</strong> - {edu.fieldOfStudy}, {edu.school} ({edu.grade})
          </li>
        ))}
      </ul>
    </section>

    <section className="professional-section">
      <h3>Skills</h3>
      <ul>
        {skills.map((skill, idx) => (
          <li key={idx}>{skill}</li>
        ))}
      </ul>
    </section>

    <section className="professional-section">
      <h3>Certifications</h3>
      <ul>
        {certifications.map((cert, idx) => (
          <li key={idx}>
            <strong>{cert.name}</strong> - {cert.issuer} ({new Date(cert.issueDate).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default ProfessionalTemplate;
