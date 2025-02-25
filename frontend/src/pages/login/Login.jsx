import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../components/navbar/NavBar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}users/login`,
                { email, password },
                { withCredentials: true }
            );

            console.log(res.data.token);
            toast.success('Login successful', {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
            });

            navigate('/Dashboard');
        } catch (err) {
            toast.error('Login failed!', {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
            });
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <NavBar />
        <div className='login-page'>
        <div className="login-container">
            <form onSubmit={handleLogin} aria-busy={loading} className="login-form">
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <button className="login-btn" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <a className="register-now" href="/register">
                    Don't have an account? Register now!
                </a>
            </form>
            {error && <p className="login-error">{error}</p>}
            <ToastContainer />
        </div>
        </div>
        </>
    );
};

export default Login;
