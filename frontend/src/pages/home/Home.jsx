import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

            <section className="hero-section">
                <h1>Welcome to Resume Builder</h1>
                <p>Build your professional resume in minutes, totally free!</p>
                <a href="login">
                    <button className="cta-button">Start Now</button>
                </a>
            </section>

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
