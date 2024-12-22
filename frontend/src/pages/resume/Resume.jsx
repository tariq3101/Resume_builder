import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfessionalTemplate from "../../components/templates/template1/ProfessionalTemplate";
import OfficialTemplate from "../../components/templates/template2/OfficialTemplate";
import ElegantTemplate from "../../components/templates/template3/ElegantTemplate";
import "./Resume.css";

const Resume = () => {
    const location = useLocation();
    const { resume } = location.state || {};

    const [formData, setFormData] = useState({
        title: resume?.title || "",
        personalInfo: resume?.personalInfo || {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            website: "",
            links: [""] // Default to one empty link field
        },
        education: resume?.education || [
            {
                school: "",
                degree: "",
                fieldOfStudy: "",
                startDate: "",
                endDate: "",
                grade: ""
            }
        ],
        workExperience: resume?.workExperience || [
            {
                company: "",
                role: "",
                description: "",
                startDate: "",
                endDate: ""
            }
        ],
        skills: resume?.skills || [""], // Corrected typo
        projects: resume?.projects || [
            {
                title: "",
                description: "",
                link: ""
            }
        ],
        awards: resume?.awards || [
            {
                name: "",
                description: ""
            }
        ],
        certifications: resume?.certifications || [
            {
                name: "",
                issuer: "",
                issueDate: "",
                expiryDate: ""
            }
        ]
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

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const updateArrayField = (fieldPath, action, index = null, newItem = null) => {
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            const fieldParts = fieldPath.split(".");
            let target = updatedData;
   
            // Traverse the object path to find the target field
            for (let i = 0; i < fieldParts.length - 1; i++) {
                const key = fieldParts[i];
                target[key] = { ...target[key] }; // Ensure immutability
                target = target[key];
            }
   
            const lastKey = fieldParts[fieldParts.length - 1];
   
            if (action === "add") {
                target[lastKey] = [...(target[lastKey] || []), newItem]; // Add the new item
            } else if (action === "remove" && index !== null) {
                target[lastKey] = target[lastKey].filter((_, i) => i !== index); // Remove the item at index
            }
   
            return updatedData;
        });
    };
   

    // Add and remove functions for dynamic fields
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


    // Handle input changes dynamically
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

    const renderTemplate = () => {
        console.log(resume.templateid)
        switch (resume.templateid) {
            case "1":
                return <ProfessionalTemplate {...formData} />;
            case "2":
                return <OfficialTemplate {...formData} />;
            case "3":
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
                            <h3>Title</h3>
                            <span className={`arrow ${expandedSections.title ? "down" : ""}`}>&#9662;</span>
                        </div>
                        {expandedSections.title && (
                            <div className="form-section-body">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange("title", "title", e.target.value)}
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
                                            onChange={(e) =>
                                                handleInputChange("personalInfo", `links[${idx}]`, e.target.value)
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeFieldHandlers.personalInfoLinks(idx)}
                                        >
                                            Remove Link
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={addFieldHandlers.personalInfoLinks}>
                                    + Add Link
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
                                            onChange={(e) => handleInputChange("skills", idx, e.target.value)}
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
        </div>
    );
};

export default Resume;