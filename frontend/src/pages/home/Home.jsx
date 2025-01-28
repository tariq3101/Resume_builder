import React from 'react';
import './Home.css';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../components/navbar/NavBar';

const Home = () => {
    return (
        <div className="home-page">
           <NavBar />
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
