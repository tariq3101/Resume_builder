import React, { useEffect, useRef } from "react";
import "./ProfessionalTemplate.css";
import html2pdf from "html2pdf.js";
import { toPng } from 'html-to-image';
import axios from "axios";
// import { jsPDF } from "jspdf";

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

const ProfessionalTemplate = ({
  personalInfo = {},
  education = [],
  workExperience = [],
  skills = [],
  certifications = [],
  awards = [],
  projects = [],
  resumeId
}) => {

  const containerRef = useRef();

  const handleDownloadPDF = () => {
    const element = containerRef.current;
    const options = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64.split(",")[1]); // Decode Base64
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
  
    return new Blob([byteArray], { type: mimeString });
  };
  

  const handleCapture = async (elementId) => {
    const node = document.getElementById(elementId);
    if (node) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay
        const dataUrl = await toPng(node, {
          quality: 1.0, 
          pixelRatio: 2, 
          canvasWidth: node.scrollWidth,
          canvasHeight: node.scrollHeight, 
        });
        if (dataUrl) {
          const blob = base64ToBlob(dataUrl); 
          const data = new FormData();
          data.append("file", blob, "screenshot.png"); 

          try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}upload`, data, {
              withCredentials: true,
            });
            const preview = response.data.url;

            await axios.patch(`${process.env.REACT_APP_BACKEND_URL}resume/updateImg/${resumeId}`, { preview }, {
              withCredentials: true,
            });

            console.log("Uploaded Image URL:", preview);
          } catch (err) {
            console.error(err);
          }
        }
      } catch (error) {
        console.error("Error capturing the image:", error);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleCapture("professional-container");
    }, 500);

    return () => clearTimeout(timeout);
  }, [personalInfo, education, workExperience, skills, certifications, awards, projects, resumeId]);

  return (
    <div>
      <button onClick={handleDownloadPDF} style={{ marginLeft: "650px", marginBottom: "20px" }}>Download Resume as PDF</button>
      <div className="professional-container" id="professional-container" ref={containerRef}>
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
                  try {
                    const url = new URL(link);
                    hostname = url.hostname.replace("www.", "");
                  } catch {
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
                      {formatDate(job.startDate)} - {formatDate(job.endDate) || "Present"}
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
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
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
                  <em>{cert.issuer || "Issuer"} ({formatDate(cert.issueDate)})</em>
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
                  <em>{award.date && ` (${formatDate(award.date)})`}</em>
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
                  <p>{project.description || "Project Description"}</p>
                  {project.techStack && (
                    <p>
                      <strong>Technologies:</strong> {project.techStack.join(", ")}
                    </p>
                  )}
                  {project.link && (
                    <p>
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
