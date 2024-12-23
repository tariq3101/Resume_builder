import React from "react";
import "./ElegantTemplate.css";

const ElegantTemplate = ({ personalInfo, education, workExperience, skills, certifications, awards, projects }) => (
  <div className="elegant-container">
    {/* Header Section */}
    <header className="elegant-header">
      <h1>{personalInfo.fullName}</h1>
      <h2>{personalInfo.jobRole}</h2>
      <div className="contact-info">
        <p><strong>Email:</strong> {personalInfo.email}</p>
        <p><strong>Phone:</strong> {personalInfo.phone}</p>
        <p><strong>Address:</strong> {personalInfo.address}</p>
      </div>

      {/* Links Section in Personal Info */}
      {personalInfo.links.length > 0 && (
        <div className="elegant-links">
          <h3>Links</h3>
          {personalInfo.links.map((link, idx) => {
            let hostname = "";
            try {
              const url = new URL(link);
              hostname = url.hostname.replace("www.", "");
            } catch (error) {
              hostname = link;
            }

            return (
              <p key={idx}>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#3498db" }}>
                  {hostname}
                </a>
              </p>
            );
          })}
        </div>
      )}
    </header>

    {/* Education Section */}
    <section className="elegant-section">
      <h3>Education</h3>
      {education.map((edu, idx) => (
        <div key={idx} className="education-item">
          <strong>{edu.degree}</strong> - {edu.fieldOfStudy}, {edu.school}
        </div>
      ))}
    </section>

    {/* Skills Section */}
    <section className="elegant-section">
      <h3>Skills</h3>
      <p>{skills.join(", ")}</p>
    </section>

    {/* Work Experience Section */}
    <section className="elegant-section">
      <h3>Work Experience</h3>
      {workExperience.map((job, idx) => (
        <div key={idx} className="work-item">
          <h4>{job.role} at {job.company} <em>
                    {job.startDate
                      ? new Date(job.startDate).toLocaleDateString()
                      : "Start Date"}{" "}
                    - 
                    {job.endDate
                      ? new Date(job.endDate).toLocaleDateString()
                      : "Present"}
                  </em></h4>
          <p>{job.description}</p>
        </div>
      ))}
    </section>

    {/* Certifications Section */}
    {certifications.length > 0 && (
      <section className="elegant-section">
        <h3>Certifications</h3>
        {certifications.map((cert, idx) => (
          <div key={idx} className="certification-item">
            <strong>{cert.name}</strong> -{" "}
            {cert.issuer || "Issuer"} - <em>{new Date(cert.issueDate).toLocaleDateString()}</em>
          </div>
        ))}
      </section>
    )}

    {/* Awards Section */}
    {awards.length > 0 && (
      <section className="elegant-section">
        <h3>Awards</h3>
        {awards.map((award, idx) => (
          <div key={idx} className="award-item">
            <strong>{award.title}</strong> - <em>{award.date ? new Date(award.date).toLocaleDateString() : "Date"}</em>
            <p>{award.organization}</p>
          </div>
        ))}
      </section>
    )}

    {/* Projects Section */}
    {projects.length > 0 && (
      <section className="elegant-section">
        <h3>Projects</h3>
        {projects.map((project, idx) => (
          <div key={idx} className="project-item">
            <h4>{project.title}</h4>
            <p><strong>Description:</strong> {project.description}</p>
            {project.techStack && <p><strong>Technologies:</strong> {project.techStack.join(", ")}</p>}
            {project.link && (
              <p>
                <strong>Project Link:</strong>{" "}
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </p>
            )}
          </div>
        ))}
      </section>
    )}
  </div>
);

export default ElegantTemplate;
