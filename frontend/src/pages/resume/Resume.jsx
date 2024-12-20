import ProfessionalTemplate from "../../components/templates/template1/ProfessionalTemplate";
import OfficialTemplate from "../../components/templates/template2/OfficialTemplate";
import ElegantTemplate from "../../components/templates/template3/ElegantTemplate";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Resume.css";

const Resume = () => {
    const [template, setTemplate] = useState("professional");
    const [formData, setFormData] = useState({
        title: "",
        personalInfo: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            website: "",
            links: [""],
            jobRole: "",
        },
        education: [
            {
                school: "",
                degree: "",
                fieldOfStudy: "",
                startDate: "",
                endDate: "",
                grade: "",
            },
        ],
        workExperience: [
            {
                company: "",
                role: "",
                description: "",
                startDate: "",
                endDate: "",
            },
        ],
        skills: [""],
        projects: [
            {
                title: "",
                description: "",
                link: "",
            },
        ],
        awards: [
            {
                title: "",
                organization: "",
                date: "",
            },
        ],
        certifications: [
            {
                name: "",
                issuer: "",
                issueDate: "",
                expiryDate: "",
            },
        ],
    });

    const [expandedSections, setExpandedSections] = useState({
        title: true,
        personalInfo: true,
        workExperience: false,
        education: false,
        skills: false,
        projects: false,
        awards: false,
        certifications: false,
    });

    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve title from localStorage when the page loads
        const savedTitle = localStorage.getItem('resumeTitle');
        if (savedTitle) {
            setTitle(savedTitle); // Set title if found
        } else {
            // Handle case where title is not available (e.g., navigate back)
            navigate('/');
        }
    }, [navigate]);


    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleAddLinkField = () => {
        setFormData((prevData) => ({
            ...prevData,
            personalInfo: {
                ...prevData.personalInfo,
                links: [...prevData.personalInfo.links, ""]
            }
        }));
    };

    const handleRemoveLinkField = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            personalInfo: {
                ...prevData.personalInfo,
                links: prevData.personalInfo.links.filter((_, idx) => idx !== index)
            }
        }));
    };

    // Handle adding a new work experience entry
    const handleAddWorkExperience = () => {
        setFormData((prevData) => ({
            ...prevData,
            workExperience: [
                ...prevData.workExperience,
                { company: "", role: "", description: "", startDate: "", endDate: "" }
            ]
        }));
    };

    // Handle removing a work experience entry
    const handleRemoveWorkExperience = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            workExperience: prevData.workExperience.filter((_, idx) => idx !== index)
        }));
    };

    // Handle adding a new education entry
    const handleAddEducation = () => {
        setFormData((prevData) => ({
            ...prevData,
            education: [
                ...prevData.education,
                { school: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "" }
            ]
        }));
    };

    // Handle removing an education entry
    const handleRemoveEducation = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            education: prevData.education.filter((_, idx) => idx !== index)
        }));
    };

    // Handle adding a new skill
    const handleAddSkill = () => {
        setFormData((prevData) => ({
            ...prevData,
            skills: [...prevData.skills, ""]
        }));
    };

    // Handle removing a skill
    const handleRemoveSkill = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            skills: prevData.skills.filter((_, idx) => idx !== index)
        }));
    };

    // Handle adding a new project
    const handleAddProject = () => {
        setFormData((prevData) => ({
            ...prevData,
            projects: [
                ...prevData.projects,
                { title: "", description: "", link: "" }
            ]
        }));
    };

    // Handle removing a project
    const handleRemoveProject = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            projects: prevData.projects.filter((_, idx) => idx !== index)
        }));
    };

    // Handle adding a new award
    const handleAddAward = () => {
        setFormData((prevData) => ({
            ...prevData,
            awards: [...prevData.awards, { name: "", description: "" }]
        }));
    };

    // Handle removing an award
    const handleRemoveAward = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            awards: prevData.awards.filter((_, idx) => idx !== index)
        }));
    };

    // Handle adding a new certification
    const handleAddCertification = () => {
        setFormData((prevData) => ({
            ...prevData,
            certifications: [
                ...prevData.certifications,
                { name: "", description: "" }
            ]
        }));
    };

    // Handle removing a certification
    const handleRemoveCertification = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            certifications: prevData.certifications.filter((_, idx) => idx !== index)
        }));
    };


    const handleInputChange = (section, field, value, index = null) => {
        // Handle date formatting for startDate and endDate fields
        if (field === 'startDate' || field === 'endDate') {
          value = new Date(value).toISOString(); // Convert date to ISO string
        }
      
        setFormData((prevState) => {
          const updatedData = { ...prevState };
      
          if (section === 'workExperience' || section === 'education') {
            // Handle startDate and endDate for array items
            if (index !== null) {
              updatedData[section][index] = {
                ...updatedData[section][index],
                [field]: value,
              };
            }
          } else {
            // Handle non-array fields like personal info
            updatedData[section][field] = value;
          }
      
          return updatedData;
        });
      };
      

    const renderTemplate = () => {
        switch (template) {
            case "professional":
                return <ProfessionalTemplate {...formData} />;
            case "official":
                return <OfficialTemplate {...formData} />;
            case "elegant":
                return <ElegantTemplate {...formData} />;
            default:
                return null;
        }
    };

    return (
        <div className="resume-page">
            <div className="resume-container">
                {/* Left Panel */}
                <div className="form-panel">
                    <h2>Fill Your Resume Details</h2>

                    {/* Title */}
                    <div className="form-section">
                        <div className="form-section-header" onClick={() => toggleSection("title")}>
                            <h3>Resume Title</h3>
                            <span className={`arrow ${expandedSections.title ? "down" : ""}`}>&#9662;</span>
                        </div>
                        {expandedSections.title && (
                            <div className="form-section-body">
                                <input
                                    type="text"
                                    placeholder="Resume Title"
                                    value={title}
                                    onChange={(e) => handleInputChange("title", "title", e.target.value)} // Dynamically update formData
                                />
                            </div>
                        )}
                    </div>


                    {/* Personal Info */}
                    <div className="form-section">
                        <div className="form-section-header" onClick={() => toggleSection("personalInfo")}>
                            <h3>Personal Information</h3>
                            <span className={`arrow ${expandedSections.personalInfo ? "down" : ""}`}>&#9662;</span>
                        </div>
                        {expandedSections.personalInfo && (
                            <div className="form-section-body">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.personalInfo.fullName}
                                    onChange={(e) =>
                                        handleInputChange("personalInfo", "fullName", e.target.value)
                                    }
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.personalInfo.email}
                                    onChange={(e) =>
                                        handleInputChange("personalInfo", "email", e.target.value)
                                    }
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={formData.personalInfo.phone}
                                    onChange={(e) =>
                                        handleInputChange("personalInfo", "phone", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={formData.personalInfo.address}
                                    onChange={(e) =>
                                        handleInputChange("personalInfo", "address", e.target.value)
                                    }
                                />
                                <input
                                    type="url"
                                    placeholder="Website"
                                    value={formData.personalInfo.website}
                                    onChange={(e) =>
                                        handleInputChange("personalInfo", "website", e.target.value)
                                    }
                                />

                                {/* Links section */}
                                <div className="links-section">
                                    {formData.personalInfo.links.map((link, index) => (
                                        <div key={index} className="link-input-field">
                                            <input
                                                type="url"
                                                placeholder={`Link ${index + 1}`}
                                                value={link}
                                                onChange={(e) =>
                                                    handleInputChange("personalInfo", "links", e.target.value, index)
                                                }
                                            />
                                        </div>
                                    ))}
                                    {formData.personalInfo.links.length < 5 && (
                                        <button
                                            className="add-link-button"
                                            onClick={() => handleAddLinkField()}
                                        >
                                            + Add Link
                                        </button>
                                    )}
                                </div>

                                <input
                                    type="text"
                                    placeholder="Job Role"
                                    value={formData.personalInfo.jobRole}
                                    onChange={(e) =>
                                        handleInputChange("personalInfo", "jobRole", e.target.value)
                                    }
                                />
                            </div>
                        )}
                    </div>


                    {/* Work Experience */}
                    <div className="form-section">
                        <div
                            className="form-section-header"
                            onClick={() => toggleSection("workExperience")}
                        >
                            <h3>Work Experience</h3>
                            <span className={`arrow ${expandedSections.workExperience ? "down" : ""}`}>&#9662;</span>
                        </div>
                        {expandedSections.workExperience && (
                            <div className="form-section-body">
                                {formData.workExperience.map((exp, idx) => (
                                    <div key={idx} className="array-item">
                                        <input
                                            type="text"
                                            placeholder="Company"
                                            value={exp.company}
                                            onChange={(e) =>
                                                handleInputChange("workExperience", "company", e.target.value, idx)
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Role"
                                            value={exp.role}
                                            onChange={(e) =>
                                                handleInputChange("workExperience", "role", e.target.value, idx)
                                            }
                                        />
                                        <textarea
                                            placeholder="Description"
                                            value={exp.description}
                                            onChange={(e) =>
                                                handleInputChange("workExperience", "description", e.target.value, idx)
                                            }
                                        />

                                        <input
                                            type="date"
                                            value={exp.startDate}
                                            onChange={(e) =>
                                                handleInputChange("workExperience", "startDate", e.target.value, idx)
                                            }
                                        />
                                        <input
                                            type="date"
                                            value={exp.endDate}
                                            onChange={(e) =>
                                                handleInputChange("workExperience", "endDate", e.target.value, idx)
                                            }
                                        />
                                        <button
                                            className="remove-item-button"
                                            onClick={() => handleRemoveWorkExperience(idx)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="add-item-button"
                                    onClick={() => handleAddWorkExperience()}
                                >
                                    + Add Work Experience
                                </button>
                            </div>
                        )}
                    </div>


                    {/* Education */}
                    <div className="form-section">
                        <div
                            className="form-section-header"
                            onClick={() => toggleSection("education")}
                        >
                            <h3>Education</h3>
                            <span className={`arrow ${expandedSections.education ? "down" : ""}`}>&#9662;</span>
                        </div>
                        {expandedSections.education && (
                            <div className="form-section-body">
                                {formData.education.map((edu, idx) => (
                                    <div key={idx} className="array-item">
                                        <input
                                            type="text"
                                            placeholder="School"
                                            value={edu.school}
                                            onChange={(e) =>
                                                handleInputChange("education", "school", e.target.value, idx)
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Degree"
                                            value={edu.degree}
                                            onChange={(e) =>
                                                handleInputChange("education", "degree", e.target.value, idx)
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Field of Study"
                                            value={edu.fieldOfStudy}
                                            onChange={(e) =>
                                                handleInputChange("education", "fieldOfStudy", e.target.value, idx)
                                            }
                                        />
                                        <input
                                            type="date"
                                            value={edu.startDate}
                                            onChange={(e) =>
                                                handleInputChange("education", "startDate", e.target.value, idx)
                                            }
                                        />
                                        <input
                                            type="date"
                                            value={edu.endDate}
                                            onChange={(e) =>
                                                handleInputChange("education", "endDate", e.target.value, idx)
                                            }
                                        />
                                        <button
                                            className="remove-item-button"
                                            onClick={() => handleRemoveEducation(idx)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="add-item-button"
                                    onClick={() => handleAddEducation()}
                                >
                                    + Add Education
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Skills */}
                    <div className="form-section">
                        <div className="form-section-header" onClick={() => toggleSection("skills")}>
                            <h3>Skills</h3>
                            <span className={`arrow ${expandedSections.skills ? "down" : ""}`}>&#9662;</span>
                        </div>
                        {expandedSections.skills && (
                            <div className="form-section-body">
                                {formData.skills.map((skill, idx) => (
                                    <div key={idx} className="array-item">
                                        <input
                                            type="text"
                                            placeholder={`Skill ${idx + 1}`}
                                            value={skill}
                                            onChange={(e) =>
                                                handleInputChange("skills", idx, e.target.value)
                                            }
                                        />
                                        <button
                                            className="remove-item-button"
                                            onClick={() => handleRemoveSkill(idx)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="add-item-button"
                                    onClick={() => handleAddSkill()}
                                >
                                    + Add Skill
                                </button>
                            </div>
                        )}
                    </div>


                    {/* Projects */}
                    <div className="form-section">
                        <div className="form-section-header" onClick={() => toggleSection("projects")}>
                            <h3>Projects</h3>
                            <span className={`arrow ${expandedSections.projects ? "down" : ""}`}>&#9662;</span>
                        </div>
                        {expandedSections.projects && (
                            <div className="form-section-body">
                                {formData.projects.map((project, idx) => (
                                    <div key={idx} className="array-item">
                                        <input
                                            type="text"
                                            placeholder="Project Title"
                                            value={project.title}
                                            onChange={(e) =>
                                                handleInputChange("projects", "title", e.target.value, idx)
                                            }
                                        />
                                        <textarea
                                            placeholder="Project Description"
                                            value={project.description}
                                            onChange={(e) =>
                                                handleInputChange("projects", "description", e.target.value, idx)
                                            }
                                        />
                                        <input
                                            type="url"
                                            placeholder="Project Link"
                                            value={project.link}
                                            onChange={(e) =>
                                                handleInputChange("projects", "link", e.target.value, idx)
                                            }
                                        />
                                        <button
                                            className="remove-item-button"
                                            onClick={() => handleRemoveProject(idx)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="add-item-button"
                                    onClick={() => handleAddProject()}
                                >
                                    + Add Project
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Awards */}
                    <div className="form-section">
                        <div className="form-section-header" onClick={() => toggleSection("awards")}>
                            <h3>Awards</h3>
                            <span className={`arrow ${expandedSections.awards ? "down" : ""}`}>&#9662;</span>
                        </div>
                        {expandedSections.awards && (
                            <div className="form-section-body">
                                {formData.awards.map((award, idx) => (
                                    <div key={idx} className="array-item">
                                        <input
                                            type="text"
                                            placeholder="Award Name"
                                            value={award.name}
                                            onChange={(e) =>
                                                handleInputChange("awards", "name", e.target.value, idx)
                                            }
                                        />
                                        <textarea
                                            placeholder="Award Description"
                                            value={award.description}
                                            onChange={(e) =>
                                                handleInputChange("awards", "description", e.target.value, idx)
                                            }
                                        />
                                        <button
                                            className="remove-item-button"
                                            onClick={() => handleRemoveAward(idx)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="add-item-button"
                                    onClick={() => handleAddAward()}
                                >
                                    + Add Award
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Certifications */}
                    <div className="form-section">
                        <div className="form-section-header" onClick={() => toggleSection("certifications")}>
                            <h3>Certifications</h3>
                            <span className={`arrow ${expandedSections.certifications ? "down" : ""}`}>&#9662;</span>
                        </div>
                        {expandedSections.certifications && (
                            <div className="form-section-body">
                                {formData.certifications.map((cert, idx) => (
                                    <div key={idx} className="array-item">
                                        <input
                                            type="text"
                                            placeholder="Certification Name"
                                            value={cert.name}
                                            onChange={(e) =>
                                                handleInputChange("certifications", "name", e.target.value, idx)
                                            }
                                        />
                                        <textarea
                                            placeholder="Certification Description"
                                            value={cert.description}
                                            onChange={(e) =>
                                                handleInputChange("certifications", "description", e.target.value, idx)
                                            }
                                        />
                                        <button
                                            className="remove-item-button"
                                            onClick={() => handleRemoveCertification(idx)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="add-item-button"
                                    onClick={() => handleAddCertification()}
                                >
                                    + Add Certification
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="preview-panel">
                    <h2>Preview</h2>
                    {renderTemplate()}
                </div>
            </div>
        </div>
    );
};

export default Resume;