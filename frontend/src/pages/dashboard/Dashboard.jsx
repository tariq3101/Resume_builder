import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../../components/navbar/NavBar";
import Resume from "../resume/Resume";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  const templates = [
    { id: 1, name: 'Template 1', image: '/path/to/template1.jpg' },
    { id: 2, name: 'Template 2', image: '/path/to/template2.jpg' },
    { id: 3, name: 'Template 3', image: '/path/to/template3.jpg' },
  ];

  const [templateid, settemplateid] = useState(null);
  const [title, settitle] = useState('');
  const [error, setError] = useState('');

  const selectTemplate = (templateId) => {
    settemplateid(templateId);
    setError('');
  };

  const submitTitle = async () => {
    if (!title.trim()) {
      setError('Please enter a resume title.'); 
      return;
    }
    if (!templateid) {
      setError('Please select a template.'); 
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/resume/create', { title, templateid },
        { withCredentials: true });
      toast.success('Resume created', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        //transition: Bounce,
      });
      const resume = res.data
      // localStorage.setItem('resumeTitle', title);
      navigate(`/resume/${resume._id}`, { state: {resume} });
    } catch (error) {
      toast.error('OPeration failed!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        //transition: Bounce,
      });
    }
  };

  // Fetch resumes from the server
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/resume/",
          { withCredentials: true });
        setResumes(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  const handleCardClick = (resume) => {
    navigate(`/resume/${resume._id}`, { state: {resume} });
  };

  return (
    <div className="dashboard">
      <NavBar/>
      <div className="templates-container">
        {/* <h1>Choose a Resume Template</h1> */}

        {/* Template List */}
        <div className="templates-list">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`template-card ${templateid === template.id ? 'selected' : ''}`}
              onClick={() => selectTemplate(template.id)} 
            >
              <img src={template.image} alt={template.name} className="template-image" />
              <p>{template.name}</p>
            </div>
          ))}
        </div>

        {/* Resume Title Input */}
        {templateid && (
          <div className="template-input">
            <input
              type="text"
              placeholder="Enter Resume Title"
              value={title}
              onChange={(e) => settitle(e.target.value)} 
              className="resume-title-input"
            />
            <button onClick={submitTitle} className="submit-button">
              Submit
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}
        <ToastContainer />
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
