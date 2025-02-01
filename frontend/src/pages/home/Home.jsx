import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../components/navbar/NavBar';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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


    const handleLogin = () => {
        if (isLoggedIn) {
            window.location.href = '/Dashboard';
        } else {
            window.location.href = '/login';
        }
    }

    return (
        <>
            <NavBar />
            <div className="home-page">

                <section className="hero-section">
                    <h1>Welcome to CVCraft</h1>
                    <p>Build your professional resume in minutes, totally free!</p>
                    <button className="cta-button" onClick={handleLogin}>Start Now</button>
                </section>

                <section className="features-section">
                    <h2>Features</h2>
                    <ul>
                        <li>✅ Simple and Easy to Use</li>
                        <li>✅ Real-Time Updates</li>
                        <li>✅ Modern and Professional UI</li>
                    </ul>
                </section>

                <section className="contact-section" id='contact-section'>
                    <h2>Contact Us</h2>
                    <p>Email: <a href="mailto:khantariq10648@gmail.com">khantariq10648@gmail.com</a></p>
                    <p>Phone: +91 1234567890</p>
                    <p>Address: Undariya Street, Nagpada, Mumbai</p>
                </section>

                <footer className="footer">
                    <p>&copy; {new Date().getFullYear()} CVCraft. All Rights Reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default Home;
