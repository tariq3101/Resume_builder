import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Link} from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users/isLoggedIn`, {
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
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}users/logout`, {}, {
                withCredentials: true,
            });
            setIsLoggedIn(false);
            Cookies.remove('token');
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleDashboard = async () => {
        if (isLoggedIn) {
            navigate("/Dashboard")
        } else {
            navigate("/Login")
        }
    }

    return (
        <div className='nbar'>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/" style={{textDecoration: 'none'}}><h2>CVCraft</h2></Link>
                </div>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    {!isLoggedIn ? (
                        <>
                            <li><a href="login">Login</a></li>
                            <li><a href="register">Register</a></li>
                        </>
                    ) : (
                        <li>
                            <a href='/' onClick={handleLogout}>Logout</a>
                        </li>
                    )}
                    <li><a href="#t" onClick={handleDashboard}>Resumes</a></li>
                </ul>
                <div className="hamburger" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
