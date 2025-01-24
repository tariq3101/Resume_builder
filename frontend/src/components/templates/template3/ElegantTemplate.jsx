import React, { useRef } from "react";
import "./ElegantTemplate.css";
import html2pdf from "html2pdf.js";

const ElegantTemplate = ({
  personalInfo,
  education,
  workExperience,
  skills,
  certifications,
  awards,
  projects,
}) => {

  
const formatDate = (date) => {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
};

  const templateRef = useRef(); 

  const handleDownloadPDF = () => {
    const element = templateRef.current;
    const options = {
      margin: 0, 
      filename: `${personalInfo.fullName.replace(/ /g, "_")}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 6 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  // Helper to render links
  const renderLinks = (links) =>
    links.length > 0 && (
      <div className="elegant-links">
        {links.map((link, idx) => {
          let hostname;
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
    );

  // Helper to render sections
  const renderSection = (title, content, renderItem) =>
    content.length > 0 && (
      <section className="elegant-section">
        <h3 className="section-title">{title}</h3>
        {content.map(renderItem)}
      </section>
    );

  // Specific renderers for each section
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
        {formatDate(job.startDate)} -{" "}
        {job.endDate ? formatDate(job.endDate) : "Present"}
      </p>
      <p className="item-description">{job.description}</p>
    </div>
  );

  const renderCertifications = (cert, idx) => (
    <div key={idx} className="certification-item">
      <p className="item-title">{cert.name}</p>
      <p className="item-subtitle">
        {cert.issuer} - {formatDate(cert.issueDate)}
      </p>
    </div>
  );

  const renderAwards = (award, idx) => (
    <div key={idx} className="award-item">
      <p className="item-title">{award.title}</p>
      <p className="item-subtitle">
        {award.organization} - {formatDate(award.date)}
      </p>
    </div>
  );

  const renderProjects = (project, idx) => (
    <div key={idx} className="project-item">
      <p className="item-title">{project.title}</p>
      <p className="item-description">{project.description}</p>
      {project.techStack && (
        <p className="item-tech">Technologies: {project.techStack.join(", ")}</p>
      )}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          View Project
        </a>
      )}
    </div>
  );

  return (
    <div>
    <div ref={templateRef} className="elegant-container"> 
      {/* Header Section */}
      <header className="elegant-header">
        <h1 className="main-title">{personalInfo.fullName}</h1>
        <h2 className="subtitle">{personalInfo.jobRole}</h2>
        <div className="contact-info">
          <p>
            Email:{" "}
            <a href={`mailto:${personalInfo.email}`} className="contact-link">
              {personalInfo.email}
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href={`tel:${personalInfo.phone}`} className="contact-link">
              {personalInfo.phone}
            </a>
          </p>
          <p>Address: {personalInfo.address}</p>
        </div>
        {renderLinks(personalInfo.links)}
      </header>

      {/* Sections */}
      {renderSection("Education", education, renderEducation)}
      {renderSection("Work Experience", workExperience, renderWorkExperience)}
      {renderSection("Certifications", certifications, renderCertifications)}
      {renderSection("Awards", awards, renderAwards)}

      {/* Skills Section */}
      <section className="elegant-section">
        <h3 className="section-title">Skills</h3>
        {skills.length > 0 ? (
          <ul className="skills-list">
            {skills.map((skill, idx) => (
              <li key={idx} className="skill-item">
                {skill}
              </li>
            ))}
          </ul>
        ) : (
          <p>No skills listed.</p>
        )}
      </section>

      {renderSection("Projects", projects, renderProjects)}

    </div>
    <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default ElegantTemplate;
