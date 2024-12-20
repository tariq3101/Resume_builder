import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResumeTemplates = () => {
    // List of templates
    const templates = [
        { id: 1, name: 'Template 1', image: '/path/to/template1.jpg' },
        { id: 2, name: 'Template 2', image: '/path/to/template2.jpg' },
        { id: 3, name: 'Template 3', image: '/path/to/template3.jpg' },
    ];
    const navigate = useNavigate();

    const [templateid, settemplateid] = useState(null); // Tracks selected template
    const [title, settitle] = useState(''); // Stores the resume title
    const [error, setError] = useState(''); // Error message for validation

    // Handles template selection
    const selectTemplate = (templateId) => {
        settemplateid(templateId); // Save the selected template ID
        setError(''); // Clear any error messages
    };

    // Handles form submission
    const submitTitle = async () => {
        if (!title.trim()) {
            setError('Please enter a resume title.'); // Show error if title is empty
            return;
        }
        if (!templateid) {
            setError('Please select a template.'); // Show error if no template is selected
            return;
        }

        // Pass the selected template and title to the parent component
        //onTemplateSelect({ templateId: templateid, title: title });
        try {
            const res = await axios.post('http://localhost:5000/api/resume/create', { title, templateid},
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
                localStorage.setItem('resumeTitle', title);
                navigate('/resume');
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

    return (
        <div className="templates-container">
            {/* <h1>Choose a Resume Template</h1> */}

            {/* Template List */}
            <div className="templates-list">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`template-card ${templateid === template.id ? 'selected' : ''}`}
                        onClick={() => selectTemplate(template.id)} // Select template on click
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
                        onChange={(e) => settitle(e.target.value)} // Update title
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
            window.location.href = '/';
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
                            <a href='#' onClick={handleLogout}>Logout</a>
                        </li>
                    )}
                    <li><a href="#features">Resumes</a></li>
                    <li><a href="#contact-section">Contact</a></li>
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

            <section className="contact-section" id='contact-section'>
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
