import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Home.css';

const ResumeTemplates = ({ onTemplateSelect }) => {
    const templates = [
        { id: 1, name: 'Template 1', image: '/path/to/template1.jpg' },
        { id: 2, name: 'Template 2', image: '/path/to/template2.jpg' },
        { id: 3, name: 'Template 3', image: '/path/to/template3.jpg' },
    ];

    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [resumeTitle, setResumeTitle] = useState('');
    const [error, setError] = useState('');

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId);
        setError('');
    };

    const handleResumeTitleSubmit = () => {
        if (!resumeTitle.trim()) {
            setError('Resume title is required!');
            return;
        }

        if (selectedTemplate) {
            onTemplateSelect({ templateId: selectedTemplate, title: resumeTitle });
        } else {
            setError('Please select a template before proceeding!');
        }
    };

    return (
        <div className="templates-container">
            {/* <h1 className="templates-title">Choose a Resume Template</h1> */}
            <div className="templates-list">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                        onClick={() => handleTemplateSelect(template.id)}
                        tabIndex={0}
                    >
                        <img
                            className="template-image"
                            src={template.image}
                            alt={template.name}
                        />
                        <button className="choose-template-button">Choose</button>
                    </div>
                ))}
            </div>
            {selectedTemplate && (
                <div className="template-input">
                    <label className="resume-title-label">
                        Enter Resume Title:
                        <input
                            className="resume-title-input"
                            type="text"
                            value={resumeTitle}
                            onChange={(e) => setResumeTitle(e.target.value)}
                            placeholder="e.g., Software Engineer Resume"
                        />
                    </label>
                    <button className="submit-template-button" onClick={handleResumeTitleSubmit}>
                        Submit
                    </button>
                </div>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/isLoggedIn', {
                    withCredentials: true,
                });

                setIsLoggedIn(response.data.loggedIn);
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/users/logout', {}, {
                withCredentials: true,
            });
            setIsLoggedIn(false);
            Cookies.remove('token');
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="home-page">
            <nav className="navbar">
                <div className="logo">
                    <h2>Resume Builder</h2>
                </div>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    {!isLoggedIn ? (
                        <>
                            <li><a href="login">Login</a></li>
                            <li><a href="register">Register</a></li>
                        </>
                    ) : (
                        <li>
                            <button className="logout-btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    )}
                    <li><a href="#features">Features</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div className="hamburger" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </nav>

            {!isLoggedIn ? (
                <section className="hero-section">
                    <h1>Welcome to Resume Builder</h1>
                    <p>Build your professional resume in minutes, totally free!</p>
                    <a href="login">
                        <button className="cta-button">Start Now</button>
                    </a>
                </section>
            ) : (
                <ResumeTemplates
                    onTemplateSelect={(data) => {
                        console.log('Template selected:', data);
                    }}
                />
            )}

            <section className="features-section">
                <h2>Features</h2>
                <ul>
                    <li>✅ Simple and Easy to Use</li>
                    <li>✅ Auto-Save Feature</li>
                    <li>✅ Real-Time Updates</li>
                    <li>✅ Modern and Professional UI</li>
                </ul>
            </section>

            <section className="contact-section">
                <h2>Contact Us</h2>
                <p>Email: <a href="mailto:support@resumebuilder.com">support@resumebuilder.com</a></p>
                <p>Phone: +1 (123) 456-7890</p>
                <p>Address: 123 Resume Street, Web City, CodeLand</p>
            </section>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Resume Builder. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
