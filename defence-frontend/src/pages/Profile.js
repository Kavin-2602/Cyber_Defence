import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import './Profile.css';

export default function Profile() {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await API.get('/users/me');
            setComplaints(res.data.complaints || []);
        } catch (err) {
            console.error('Failed to fetch profile:', err);
            setComplaints([]);
        } finally {
            setLoading(false);
        }
    };

    const getInitial = () => (user?.username?.[0] || 'U').toUpperCase();

    const getSeverityClass = (sev) => {
        switch (sev) {
            case 'HIGH': return 'badge-high';
            case 'MEDIUM': return 'badge-medium';
            case 'LOW': return 'badge-low';
            default: return '';
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Operative Profile</h1>
            <p className="page-subtitle">Your identity and activity</p>

            {/* Profile Header */}
            <div className="card profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">{getInitial()}</div>
                    <div className="profile-info">
                        <h2>{user?.username || 'Unknown'}</h2>
                        <span className="role-badge">{user?.role || 'User'}</span>
                        {user?.email && (
                            <p className="profile-email">{user.email}</p>
                        )}
                    </div>
                </div>

                <div className="profile-details">
                    <div className="detail-item">
                        <span className="detail-label">Username</span>
                        <span className="detail-value">{user?.username}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Role</span>
                        <span className="detail-value">{user?.role}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Email</span>
                        <span className="detail-value">{user?.email || 'N/A'}</span>
                    </div>
                </div>
            </div>

            {/* User's Complaints */}
            <h2 className="section-title" style={{ marginTop: '2rem' }}>My Complaints</h2>

            {loading ? (
                <LoadingSpinner />
            ) : complaints.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>You have not submitted any complaints yet.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Severity</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((c, i) => (
                                <tr key={c.id || i}>
                                    <td><strong>{c.title}</strong></td>
                                    <td>
                                        <span className={`badge ${getSeverityClass(c.severity)}`}>
                                            {c.severity}
                                        </span>
                                    </td>
                                    <td>{c.type}</td>
                                    <td>{c.status || 'Pending'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
