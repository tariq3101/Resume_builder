import React from "react";
import "./ProfessionalTemplate.css";

const ProfessionalTemplate = ({
  personalInfo = {},
  education = [],
  workExperience = [],
  skills = [],
  certifications = [],
  awards = [],
  projects = []
}) => {
  return (
    <div className="professional-container">
      {/* Wrap the entire printable content with the ref */}
      <div>
        {/* Header Section */}
        <header className="professional-header">
          <h1 className="name">{personalInfo.fullName || "Your Name"}</h1>
          <h2 className="role">{personalInfo.jobRole || "Your Job Role"}</h2>
          <div className="contact-info">
            {personalInfo.email && <p>Email: {personalInfo.email}</p>}
            {personalInfo.phone && <p>Phone: {personalInfo.phone}</p>}
            {personalInfo.address && <p>Address: {personalInfo.address}</p>}
            {personalInfo.website && (
              <p>
                Website: <a href={personalInfo.website}>{personalInfo.website}</a>
              </p>
            )}
          </div>

          {/* Links Section */}
          {personalInfo.links && personalInfo.links.length > 0 && (
            <div className="links-section">
              {personalInfo.links.map((link, idx) => {
                let hostname = "";

                // Validate and extract hostname only if the link is a valid URL
                try {
                  const url = new URL(link);
                  hostname = url.hostname.replace("www.", ""); // Extract hostname without 'www.'
                } catch (error) {
                  // Handle invalid URL by showing the link itself as a fallback
                  hostname = link;
                }

                return (
                  <p key={idx}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {hostname}
                    </a>
                  </p>
                );
              })}
            </div>
          )}
        </header>

        {/* Work Experience Section */}
        {workExperience.length > 0 && (
          <section className="professional-section">
            <h3>Work Experience</h3>
            {workExperience.map((job, idx) => (
              <div key={idx} className="professional-work">
                <h4 className="job-title">
                  {job.role || "Role"} -{" "}
                  <span className="company">{job.company || "Company"}</span>
                </h4>
                <p className="work-description">
                  {job.description || "Description of work done"}
                </p>
                <p className="work-dates">
                  <em>
                    {job.startDate
                      ? new Date(job.startDate).toLocaleDateString()
                      : "Start Date"}{" "}
                    -
                    {job.endDate
                      ? new Date(job.endDate).toLocaleDateString()
                      : "Present"}
                  </em>
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="professional-section">
            <h3>Education</h3>
            {education.map((edu, idx) => (
              <div key={idx} className="education-item">
                <h4>
                  {edu.degree || "Degree"} in {edu.fieldOfStudy || "Field of Study"}
                </h4>
                <p>
                  {edu.school || "School Name"} - Grade: {edu.grade || "N/A"}
                </p>
                <p className="education-dates">
                  <em>
                    {edu.startDate
                      ? new Date(edu.startDate).toLocaleDateString()
                      : "Start Date"}{" "}
                    -
                    {edu.endDate
                      ? new Date(edu.endDate).toLocaleDateString()
                      : "Present"}
                  </em>
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section className="professional-section">
            <h3>Skills</h3>
            <ul className="skills-list">
              {skills.map((skill, idx) => (
                <li key={idx} className="skill-item">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Certifications Section */}
        {certifications.length > 0 && (
          <section className="professional-section">
            <h3>Certifications</h3>
            {certifications.map((cert, idx) => (
              <div key={idx} className="certification-item">
                <strong>{cert.name || "Certification Name"}</strong> -{" "}
                {cert.issuer || "Issuer"} (
                {cert.issueDate
                  ? new Date(cert.issueDate).toLocaleDateString()
                  : "Issue Date"}
                )
              </div>
            ))}
          </section>
        )}

        {/* Awards Section */}
        {awards.length > 0 && (
          <section className="professional-section">
            <h3>Awards</h3>
            {awards.map((award, idx) => (
              <div key={idx} className="award-item">
                <strong>{award.title || "Award Name"}</strong>
                {award.date && ` (${new Date(award.date).toLocaleDateString()})`}
                <p>{award.organization || "Award Organization"}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="professional-section">
            <h3>Projects</h3>
            {projects.map((project, idx) => (
              <div key={idx} className="project-item">
                <h4>{project.title || "Project Name"}</h4>
                <p>
                  <strong>Description:</strong> {project.description || "Project Description"}
                </p>
                {project.techStack && (
                  <p>
                    <strong>Technologies:</strong> {project.techStack.join(", ")}
                  </p>
                )}
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
    </div>
  );
};

export default ProfessionalTemplate;
