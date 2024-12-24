import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../../components/navbar/NavBar";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [templateId, setTemplateId] = useState(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const templates = [
    { id: 1, name: "Template 1", image: "/path/to/template1.jpg" },
    { id: 2, name: "Template 2", image: "/path/to/template2.jpg" },
    { id: 3, name: "Template 3", image: "/path/to/template3.jpg" },
  ];

  const selectTemplate = (id) => {
    setTemplateId(id);
    setError("");
  };

  const submitTitle = async () => {
    if (!title.trim()) {
      setError("Please enter a resume title.");
      return;
    }
    if (!templateId) {
      setError("Please select a template.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/resume/create",
        { title, templateid: templateId },
        { withCredentials: true }
      );
      toast.success("Resume created successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
      const resume = res.data;
      navigate(`/resume/${resume._id}`, {
        state: { resumeId: resume._id, templateId: resume.templateid },
      });
    } catch (error) {
      toast.error("Failed to create resume.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/resume/", {
          withCredentials: true,
        });
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  const handleCardClick = (resume) => {
    navigate(`/resume/${resume._id}`, {
      state: { resumeId: resume._id, templateId: resume.templateid },
    });
  };

  return (
    <div className="dashboard">
      <NavBar />

      <div className="templates-container">
        <div className="templates-list">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`template-card ${templateId === template.id ? "selected" : ""}`}
              onClick={() => selectTemplate(template.id)}
            >
              <img src={template.image} alt={template.name} className="template-image" />
              <p>{template.name}</p>
            </div>
          ))}
        </div>

        {templateId && (
          <div className="template-input">
            <input
              type="text"
              placeholder="Enter Resume Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="resume-title-input"
            />
            <button onClick={submitTitle} className="submit-button">
              Submit
            </button>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="dashboard-container">
        <h1>Your Resumes</h1>
        <div className="resumes-grid">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="resume-card"
              onClick={() => handleCardClick(resume)}
            >
              <h3>{resume.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
