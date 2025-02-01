import React, { useRef, useEffect } from "react";
import "./ElegantTemplate.css";
import html2pdf from "html2pdf.js";
import { toPng } from 'html-to-image';
import axios from "axios";

const ElegantTemplate = ({
  personalInfo,
  education,
  workExperience,
  skills,
  certifications,
  awards,
  projects,
  resumeId
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

  const base64ToBlob = (base64) => {
    const byteString = atob(base64.split(",")[1]); // Decode Base64
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0]; // Extract MIME type
    const arrayBuffer = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  };

  const handleCapture = async (elementId) => {
    const node = document.getElementById(elementId);
    if (node) {
      try {
        const dataUrl = await toPng(node);
        if (dataUrl) {
          const blob = base64ToBlob(dataUrl);
          const data = new FormData();
          data.append("file", blob, "screenshot.png");

          try {
            const response = await axios.post(`http://localhost:5000/upload`, data, {
              withCredentials: true,
            });
            const preview = response.data.url;

            await axios.patch(`http://localhost:5000/api/resume/updateImg/${resumeId}`, { preview }, {
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
      handleCapture("elegant-container");
    }, 500);

    return () => clearTimeout(timeout);
  }, [personalInfo, education, workExperience, skills, certifications, awards, projects, resumeId]);

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
      <button onClick={handleDownloadPDF} style={{ marginLeft: "700px", marginBottom: "20px" }} >Download PDF</button>
      <div ref={templateRef} className="elegant-container" id="elegant-container">
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

    </div>
  );
};

export default ElegantTemplate;
