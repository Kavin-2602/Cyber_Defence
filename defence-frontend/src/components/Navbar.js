import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';
import './Navbar.css';

export default function Navbar() {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    if (!user) return null;

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/dashboard" className="navbar-brand">
                    <img src={logo} alt="Logo" className="nav-logo" />
                </Link>

                <div className="navbar-links">
                    <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                        Dashboard
                    </Link>
                    <Link to="/complaints" className={`nav-link ${isActive('/complaints') ? 'active' : ''}`}>
                        Complaints
                    </Link>
                    <Link to="/submit-complaint" className={`nav-link ${isActive('/submit-complaint') ? 'active' : ''}`}>
                        Submit
                    </Link>
                    <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                        Profile
                    </Link>
                    {isAdmin && (
                        <Link to="/admin" className={`nav-link admin-link ${isActive('/admin') ? 'active' : ''}`}>
                            Admin
                        </Link>
                    )}
                </div>

                <div className="navbar-user">
                    <span className="user-name">{user.username}</span>
                    <span className="user-role">{user.role}</span>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
