import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import logo from '../assets/logo.svg';
import './ForgotPassword.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await API.post('/auth/forgot-password', { email });
            setSent(true);
            toast.success('Reset link sent to your email!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send reset link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page forgot-page">
            <div className="auth-card">
                <div className="auth-logo">
                    <img src={logo} alt="Defence Cyber Security Logo" className="logo-img" />
                </div>

                {sent ? (
                    <div className="reset-sent">
                        <div className="sent-icon">✉️</div>
                        <h3>Check Your Email</h3>
                        <p>We've sent a password reset link to <strong>{email}</strong>.</p>
                        <Link to="/login" className="btn btn-primary btn-full" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="reset-email">Email Address</label>
                            <input
                                id="reset-email"
                                className="form-input"
                                type="email"
                                placeholder="Enter your registered email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                )}

                {!sent && (
                    <div className="auth-links" style={{ justifyContent: 'center' }}>
                        <Link to="/login">Back to Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
