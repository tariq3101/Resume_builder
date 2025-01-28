import React, { useRef, useEffect } from "react";
import "./OfficialTemplate.css";
import html2pdf from "html2pdf.js";
import { toPng } from 'html-to-image';
import axios from "axios";

const OfficialTemplate = ({ personalInfo, education, workExperience, skills, certifications, awards, projects, resumeId }) => {

  const templateRef = useRef();

  const handleDownloadPDF = () => {
    const element = templateRef.current;
    const options = {
      margin: 0.7, // margin in inches
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
      handleCapture("official-container");
    }, 500);

    return () => clearTimeout(timeout);
  }, [personalInfo, education, workExperience, skills, certifications, awards, projects, resumeId]);

  return (
    <div>
      <button onClick={handleDownloadPDF} className="download-btn">Download PDF</button>
      <div className="official-container" ref={templateRef} id="official-container">
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
    </div>
  );
}

export default OfficialTemplate;
