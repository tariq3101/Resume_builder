import React from "react";
import "./ElegantTemplate.css";

const ElegantTemplate = ({ personalInfo, education, workExperience, skills, certifications, awards, projects }) => {

  const renderLinks = (links) => {
    return links.length > 0 ? (
      <div className="elegant-links">
        {links.map((link, idx) => {
          let hostname = "";
          try {
            const url = new URL(link);
            hostname = url.hostname.replace("www.", "");
          } catch (error) {
            hostname = link;
          }
          return (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-item"
            >
              {hostname}
            </a>
          );
        })}
      </div>
    ) : null;
  };

  const renderSection = (title, content, renderItem) => (
    content.length > 0 ? (
      <section className="elegant-section">
        <h3 className="section-title">{title}</h3>
        {content.map(renderItem)}
      </section>
    ) : null
  );

  const renderEducation = (edu, idx) => (
    <div key={idx} className="education-item">
      <p className="item-title">{edu.degree} in {edu.fieldOfStudy}</p>
      <p className="item-subtitle">{edu.school}</p>
    </div>
  );

  const renderWorkExperience = (job, idx) => (
    <div key={idx} className="work-item">
      <p className="item-title">{job.role} at {job.company}</p>
      <p className="item-subtitle">
        {new Date(job.startDate).toLocaleDateString()} - {job.endDate ? new Date(job.endDate).toLocaleDateString() : "Present"}
      </p>
      <p className="item-description">{job.description}</p>
    </div>
  );

  const renderCertifications = (cert, idx) => (
    <div key={idx} className="certification-item">
      <p className="item-title">{cert.name}</p>
      <p className="item-subtitle">{cert.issuer} - {new Date(cert.issueDate).toLocaleDateString()}</p>
    </div>
  );

  const renderAwards = (award, idx) => (
    <div key={idx} className="award-item">
      <p className="item-title">{award.title}</p>
      <p className="item-subtitle">{award.organization} - {new Date(award.date).toLocaleDateString()}</p>
    </div>
  );

  const renderProjects = (project, idx) => (
    <div key={idx} className="project-item">
      <p className="item-title">{project.title}</p>
      <p className="item-description">{project.description}</p>
      {project.techStack && <p className="item-tech">Technologies: {project.techStack.join(", ")}</p>}
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
          View Project
        </a>
      )}
    </div>
  );

  return (
    <div className="elegant-container">
      {/* Header Section */}
      <header className="elegant-header">
        <h1 className="main-title">{personalInfo.fullName}</h1>
        <h2 className="subtitle">{personalInfo.jobRole}</h2>
        <div className="contact-info">
          <p>Email: <a href={`mailto:${personalInfo.email}`} className="contact-link">{personalInfo.email}</a></p>
          <p>Phone: <a href={`tel:${personalInfo.phone}`} className="contact-link">{personalInfo.phone}</a></p>
          <p>Address: {personalInfo.address}</p>
        </div>
        {renderLinks(personalInfo.links)}
      </header>

      {/* Education Section */}
      {renderSection("Education", education, renderEducation)}

      {/* Skills Section */}
      <section className="elegant-section">
        <h3 className="section-title">Skills</h3>
        {skills.length > 0 ? (
          <ul className="skills-list">
            {skills.map((skill, idx) => (
              <li key={idx} className="skill-item">{skill}</li>
            ))}
          </ul>
        ) : <p>No skills listed.</p>}
      </section>

      {/* Work Experience Section */}
      {renderSection("Work Experience", workExperience, renderWorkExperience)}

      {/* Certifications Section */}
      {renderSection("Certifications", certifications, renderCertifications)}

      {/* Awards Section */}
      {renderSection("Awards", awards, renderAwards)}

      {/* Projects Section */}
      {renderSection("Projects", projects, renderProjects)}
    </div>
  );
};

export default ElegantTemplate;
