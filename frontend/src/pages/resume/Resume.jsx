import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfessionalTemplate from "../../components/templates/template1/ProfessionalTemplate";
import OfficialTemplate from "../../components/templates/template2/OfficialTemplate";
import ElegantTemplate from "../../components/templates/template3/ElegantTemplate";
import "./Resume.css";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../../components/navbar/NavBar";

const Resume = () => {
    const location = useLocation();
    const { resumeId, templateId} = location.state || {};

    const [formData, setFormData] = useState({
        preview: "",
        title: "",
        personalInfo: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            website: "",
            links: [""] 
        },
        education: [
            {
                school: "",
                degree: "",
                fieldOfStudy: "",
                startDate: "",
                endDate: "",
                grade: ""
            }
        ],
        workExperience: [
            {
                company: "",
                role: "",
                description: "",
                startDate: "",
                endDate: ""
            }
        ],
        skills: [""], 
        projects: [
            {
                title: "",
                description: "",
                link: ""
            }
        ],
        awards: [
            {
                title: "",
                organization: "",
                date: ""
            }
        ],
        certifications: [
            {
                name: "",
                issuer: "",
                issueDate: "",
                expiryDate: ""
            }
        ]
    });

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/resume/${resumeId}`, { withCredentials: true });
                // setResume(res.data);
                setFormData(res.data); 
            } catch (error) {
                toast.error('Failed to fetch resume data!', {
                    position: 'top-center',
                    autoClose: 3000,
                    theme: 'light',
                });
                console.log(error.response?.data?.message || 'Something went wrong');
            }
        };

        fetchResume();
    }, [resumeId]);

    const [expandedSections, setExpandedSections] = useState({
        title: false,
        personalInfo: false,
        workExperience: false,
        education: false,
        skills: false,
        projects: false,
        awards: false,
        certifications: false,
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const updateArrayField = (fieldPath, action, index = null, newItem = null) => {
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            const fieldParts = fieldPath.split(".");
            let target = updatedData;

            for (let i = 0; i < fieldParts.length - 1; i++) {
                const key = fieldParts[i];
                target[key] = { ...target[key] }; 
                target = target[key];
            }

            const lastKey = fieldParts[fieldParts.length - 1];

            if (action === "add") {
                target[lastKey] = [...(target[lastKey] || []), newItem];
            } else if (action === "remove" && index !== null) {
                target[lastKey] = target[lastKey].filter((_, i) => i !== index); 
            }

            return updatedData;
        });
    };


    const addFieldHandlers = {
        personalInfoLinks: () => updateArrayField("personalInfo.links", "add", null, "https://"),
        workExperience: () => updateArrayField("workExperience", "add", null, { company: "", role: "", description: "", startDate: "", endDate: "" }),
        education: () => updateArrayField("education", "add", null, { school: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "" }),
        skills: () => updateArrayField("skills", "add", null, ""),
        projects: () => updateArrayField("projects", "add", null, { title: "", description: "", link: "" }),
        awards: () => updateArrayField("awards", "add", null, { name: "", description: "" }),
        certifications: () => updateArrayField("certifications", "add", null, { name: "", issuer: "", issueDate: "", expiryDate: "" }),
    };

    const removeFieldHandlers = {
        personalInfoLinks: (index) => updateArrayField("personalInfo.links", "remove", index),
        workExperience: (index) => updateArrayField("workExperience", "remove", index),
        education: (index) => updateArrayField("education", "remove", index),
        skills: (index) => updateArrayField("skills", "remove", index),
        projects: (index) => updateArrayField("projects", "remove", index),
        awards: (index) => updateArrayField("awards", "remove", index),
        certifications: (index) => updateArrayField("certifications", "remove", index),
    };

    const handleInputChange = (section, field, value, index = null) => {
        setFormData(prevData => {
            const updatedData = { ...prevData };
            if (Array.isArray(updatedData[section])) {
                if (index !== null) {
                    updatedData[section][index] = { ...updatedData[section][index], [field]: value };
                }
            } else {
                updatedData[section][field] = value;
            }
            return updatedData;
        });
    };

    const handleSkillsChange = (index, value) => {
        setFormData(prevData => {
            const updatedSkills = [...prevData.skills];
            updatedSkills[index] = value;
            return { ...prevData, skills: updatedSkills };
        });
    };

    const handleLinksChange = (index, value) => {
        if (value === "" || value.startsWith("http://") || value.startsWith("https://")) {
            setFormData((prevData) => {
                const updatedLinks = [...prevData.personalInfo.links];
                updatedLinks[index] = value; 
                return {
                    ...prevData,
                    personalInfo: {
                        ...prevData.personalInfo,
                        links: updatedLinks,
                    },
                };
            });
        } else {
            // Show error only when value does not start with "http://" or "https://"
            console.error("Invalid URL format. Please start with 'http://' or 'https://'");
        }
    };

    const handleAddLink = () => {
        // Ensure no more than 5 links are added
        if (formData.personalInfo.links.length < 5) {
            setFormData((prevData) => {
                const updatedLinks = [...prevData.personalInfo.links, "https://"]; // Add an empty link as default
                return {
                    ...prevData,
                    personalInfo: {
                        ...prevData.personalInfo,
                        links: updatedLinks,
                    },
                };
            });
        } else {
            console.error("You cannot add more than 5 links.");
        }
    };

    const renderTemplate = () => {
        console.log(templateId)
        console.log(formData)
        switch (templateId) {
            case "1":
                return <ProfessionalTemplate {...formData} resumeId={resumeId} />;
            case "2":
                return <OfficialTemplate {...formData} resumeId={resumeId} />;
            case "3":
                return <ElegantTemplate {...formData} resumeId={resumeId} />;
            default:
                return null;
        }
    };

    const personalDB = async () => {
        try {
            await axios.patch(`http://localhost:5000/api/resume/update/${resumeId}`, { formData },
                { withCredentials: true })
            console.log(formData)
            toast.success('Changes Saved', {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
            });

        } catch (error) {
            toast.error('Changes failed!', {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
            });
            console.log(error.response?.data?.message || 'Something went wrong');
        }
    }

    return (
        <div>
            <NavBar/>
        <div className="resume-page">
            <div className="resume-container">
                {/* Left Panel */}
                <div className="form-panel">
                    <h2>Fill Your Resume Details</h2>

                    {/* Title */}
                    <div className="form-section">
                        <div className="form-section-header" onClick={() => toggleSection("title")}>
                            <h3>Title</h3>
                            <span className={`arrow ${expandedSections.title ? "down" : ""}`}>&#9662;</span>
                        </div>
                        {expandedSections.title && (
                            <div className="form-section-body">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={formData.title}
                                    disabled
                                />
                            </div>
                        )}
                    </div>

                    {/* Personal Information */}
                    <div className="form-section">
                        <div className="form-section-header" onClick={() => toggleSection("personalInfo")}>
                            <h3>Personal Info</h3>
                            <span className={`arrow ${expandedSections.personalInfo ? "down" : ""}`}>&#9662;</span>
                        </div>
                        {expandedSections.personalInfo && (
                            <div className="form-section-body">
                                {[
                                    { type: "text", placeholder: "Full Name", key: "fullName" },
                                    { type: "email", placeholder: "Email", key: "email" },
                                    { type: "tel", placeholder: "Phone", key: "phone" },
                                    { type: "text", placeholder: "Address", key: "address" },
                                    { type: "url", placeholder: "Website", key: "website" },
                                ].map((field) => (
                                    <input
                                        key={field.key}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={formData.personalInfo[field.key]}
                                        onChange={(e) => handleInputChange("personalInfo", field.key, e.target.value)}
                                    />
                                ))}

                                {/* Links */}
                                {formData.personalInfo.links.map((link, idx) => (
                                    <div key={idx}>
                                        <input
                                            type="url"
                                            placeholder={`Link ${idx + 1}`}
                                            value={link}
                                            onChange={(e) => handleLinksChange(idx, e.target.value)} 
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeFieldHandlers.personalInfoLinks(idx)}
                                        >
                                            Remove Link
                                        </button>
                                    </div>
                                ))}
                                {formData.personalInfo.links.length < 5 && (
                                    <button type="button" onClick={handleAddLink}>
                                        + Add Link
                                    </button>
                                )}
                                <button type="button" onClick={personalDB}>
                                    Save Personal Info
                                </button>

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
                                        {[
                                            { type: "text", placeholder: "Company", key: "company" },
                                            { type: "text", placeholder: "Role", key: "role" },
                                            { type: "textarea", placeholder: "Description", key: "description" },
                                            { type: "date", placeholder: "Start Date", key: "startDate" },
                                            { type: "date", placeholder: "End Date", key: "endDate" },
                                        ].map((field) => (
                                            field.type === "textarea" ? (
                                                <textarea
                                                    key={field.key}
                                                    placeholder={field.placeholder}
                                                    value={exp[field.key]}
                                                    onChange={(e) =>
                                                        handleInputChange("workExperience", field.key, e.target.value, idx)
                                                    }
                                                />
                                            ) : (
                                                <input
                                                    key={field.key}
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={exp[field.key]}
                                                    onChange={(e) =>
                                                        handleInputChange("workExperience", field.key, e.target.value, idx)
                                                    }
                                                />
                                            )
                                        ))}
                                        <button
                                            className="remove-item-button"
                                            onClick={() => removeFieldHandlers.workExperience(idx)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="add-item-button"
                                    onClick={addFieldHandlers.workExperience}
                                >
                                    + Add Work Experience
                                </button>
                                <button type="button" onClick={personalDB}>
                                    Save Work Experience
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
                                        {[
                                            { type: "text", placeholder: "School", key: "school" },
                                            { type: "text", placeholder: "Degree", key: "degree" },
                                            { type: "text", placeholder: "Field of Study", key: "fieldOfStudy" },
                                            { type: "date", placeholder: "Start Date", key: "startDate" },
                                            { type: "date", placeholder: "End Date", key: "endDate" },
                                            { type: "text", placeholder: "Grade", key: "grade" }
                                        ].map((field) => (
                                            <input
                                                key={field.key}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                value={edu[field.key]}
                                                onChange={(e) =>
                                                    handleInputChange("education", field.key, e.target.value, idx)
                                                }
                                            />
                                        ))}
                                        <button
                                            className="remove-item-button"
                                            onClick={() => removeFieldHandlers.education(idx)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="add-item-button"
                                    onClick={addFieldHandlers.education}
                                >
                                    + Add Education
                                </button>
                                <button type="button" onClick={personalDB}>
                                    Save Education
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
                                            onChange={(e) => handleSkillsChange(idx, e.target.value)}
                                        />
                                        <button
                                            className="remove-item-button"
                                            onClick={() => removeFieldHandlers.skills(idx)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="add-item-button"
                                    onClick={addFieldHandlers.skills}
                                >
                                    + Add Skill
                                </button>
                                <button type="button" onClick={personalDB}>
                                    Save Skills
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
                                        {[
                                            { type: "text", placeholder: "Project Title", key: "title" },
                                            { type: "textarea", placeholder: "Project Description", key: "description" },
                                            { type: "url", placeholder: "Project Link", key: "link" },
                                        ].map((field) =>
                                            field.type === "textarea" ? (
                                                <textarea
                                                    key={field.key}
                                                    placeholder={field.placeholder}
                                                    value={project[field.key]}
                                                    onChange={(e) =>
                                                        handleInputChange("projects", field.key, e.target.value, idx)
                                                    }
                                                />
                                            ) : (
                                                <input
                                                    key={field.key}
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={project[field.key]}
                                                    onChange={(e) =>
                                                        handleInputChange("projects", field.key, e.target.value, idx)
                                                    }
                                                />
                                            )
                                        )}
                                        <button
                                            className="remove-item-button"
                                            onClick={() => removeFieldHandlers.projects(idx)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="add-item-button"
                                    onClick={addFieldHandlers.projects}
                                >
                                    + Add Project
                                </button>
                                <button type="button" onClick={personalDB}>
                                    Save Projects
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
                                            value={award.title}
                                            onChange={(e) =>
                                                handleInputChange("awards", "title", e.target.value, idx)
                                            }
                                        />
                                        <textarea
                                            placeholder="Award organization"
                                            value={award.organization}
                                            onChange={(e) =>
                                                handleInputChange("awards", "organization", e.target.value, idx)
                                            }
                                        />
                                        <input
                                            type="date"
                                            value={award.date}
                                            onChange={(e) =>
                                                handleInputChange("awards", "date", e.target.value, idx)
                                            }
                                        />
                                        <button
                                            className="remove-item-button"
                                            onClick={() => removeFieldHandlers.awards(idx)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="add-item-button"
                                    onClick={addFieldHandlers.awards}
                                >
                                    + Add Award
                                </button>
                                <button type="button" onClick={personalDB}>
                                    Save Awards
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
                                            placeholder="Certification Issuer"
                                            value={cert.issuer}
                                            onChange={(e) =>
                                                handleInputChange("certifications", "issuer", e.target.value, idx)
                                            }
                                        />
                                        <input
                                            placeholder="Issuer date"
                                            type="date"
                                            value={cert.issueDate}
                                            onChange={(e) =>
                                                handleInputChange("certifications", "issueDate", e.target.value, idx)
                                            }
                                        />
                                        <button
                                            className="remove-item-button"
                                            onClick={() => removeFieldHandlers.certifications(idx)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="add-item-button"
                                    onClick={addFieldHandlers.certifications}
                                >
                                    + Add Certification
                                </button>
                                <button type="button" onClick={personalDB}>
                                    Save Certifications
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel (Preview) */}
                <div className="preview-panel">
                    <h2>Preview</h2>
                    {renderTemplate()}
                </div>
            </div>
            <ToastContainer />
        </div>
        </div>
    );
};

export default Resume;