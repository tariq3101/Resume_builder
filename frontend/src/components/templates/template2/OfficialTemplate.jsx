import React from "react";
import "./OfficialTemplate.css";

const OfficialTemplate = ({ personalInfo, education, workExperience, skills, certifications, awards, projects }) => (
  <div className="official-container">
    <aside className="official-sidebar">
      <h1 className="name">{personalInfo.fullName}</h1>
      <h2 className="job-role">{personalInfo.jobRole}</h2>
      <p>Email: {personalInfo.email}</p>
      <p>Phone: {personalInfo.phone}</p>
      <p>Location: {personalInfo.address}</p>

      {/* Links Section */}
      {personalInfo.links.length > 0 && (
        <div className="personal-links">
          <h3>Links</h3>
          {personalInfo.links.map((link, idx) => {
            let hostname = "";
            try {
              const url = new URL(link);
              hostname = url.hostname.replace("www.", "");
            } catch {
              hostname = link;
            }

            return (
              <p key={idx}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {hostname}
                </a>
              </p>
            );
          })}
        </div>
      )}

      {/* Skills Section */}
      <h3>Skills</h3>
      <ul>
        {skills.map((skill, idx) => (
          <li key={idx}>{skill}</li>
        ))}
      </ul>

      {/* Certifications Section */}
      <h3>Certifications</h3>
      <ul>
        {certifications.map((cert, idx) => (
          <li key={idx}>
            <strong>{cert.name}</strong> - {cert.issuer || "Issuer"} ({new Date(cert.issueDate).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </aside>

    <main className="official-main">
      {/* Education Section */}
      <section>
        <h3>Education</h3>
        {education.map((edu, idx) => (
          <div key={idx} className="education-item">
            <h4>{edu.degree} in {edu.fieldOfStudy}</h4>
            <p>{edu.school} <em>{edu.startDate ? new Date(edu.startDate).toLocaleDateString() : "Start Date"} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : "Present"}</em></p>
            <p>{edu.grade}</p>
          </div>
        ))}
      </section>

      {/* Work Experience Section */}
      <section>
        <h3>Work Experience</h3>
        {workExperience.map((job, idx) => (
          <div key={idx} className="work-item">
            <h4>{job.role}</h4>
            <p>{job.company} - <em>{job.startDate ? new Date(job.startDate).toLocaleDateString() : "Start Date"} - {job.endDate ? new Date(job.endDate).toLocaleDateString() : "Present"}</em></p>
            <p>{job.description}</p>
          </div>
        ))}
      </section>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section>
          <h3>Projects</h3>
          {projects.map((project, idx) => (
            <div key={idx} className="project-item">
              <h4>{project.title}</h4>
              <p><strong>Description:</strong> {project.description}</p>
              {project.techStack && <p><strong>Technologies:</strong> {project.techStack.join(", ")}</p>}
              {project.link && (
                <p>
                  <strong>Project Link:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Awards Section */}
      {awards.length > 0 && (
        <section className="awards-section">
          <h3>Awards</h3>
          {awards.map((award, idx) => (
            <div key={idx} className="award-item">
              <strong>{award.title}</strong> {award.date && `(${new Date(award.date).toLocaleDateString()})`}
              <p>{award.organization}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  </div>
);

export default OfficialTemplate;
