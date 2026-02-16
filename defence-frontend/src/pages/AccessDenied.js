import React from 'react';
import { Link } from 'react-router-dom';
import './AccessDenied.css';

export default function AccessDenied() {
    return (
        <div className="page-container">
            <div className="access-denied">
                <div className="denied-icon">🚫</div>
                <h1>403</h1>
                <h2 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Access Denied</h2>
                <p>You do not have the required clearance to access this area.</p>
                <Link to="/dashboard" className="btn btn-primary">
                    Return to Dashboard
                </Link>
            </div>
        </div>
    );
}
