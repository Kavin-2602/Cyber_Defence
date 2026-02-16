import React, { useState, useEffect, useCallback } from 'react';
import API from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import './AdminPanel.css';

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [auditLogs, setAuditLogs] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (activeTab === 'users') {
                const res = await API.get('/users');
                setUsers(Array.isArray(res.data) ? res.data : []);
            } else if (activeTab === 'audit') {
                const res = await API.get('/audit-log');
                setAuditLogs(Array.isArray(res.data) ? res.data : []);
            } else if (activeTab === 'complaints') {
                const res = await API.get('/complaints');
                const data = Array.isArray(res.data) ? res.data : res.data.content || [];
                setComplaints(data);
            }
        } catch (err) {
            console.error(`Failed to fetch ${activeTab}:`, err);
        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDeleteComplaint = async (id) => {
        if (!window.confirm('Are you sure you want to delete this complaint?')) return;

        try {
            await API.delete(`/complaints/${id}`);
            toast.success('Complaint deleted.');
            setComplaints(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            toast.error('Failed to delete complaint.');
        }
    };

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
            <h1 className="page-title">⚙️ Admin Panel</h1>
            <p className="page-subtitle">System administration & moderation</p>

            {/* Tab Bar */}
            <div className="tab-bar">
                <button
                    className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    👥 Users
                </button>
                <button
                    className={`tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
                    onClick={() => setActiveTab('audit')}
                >
                    📋 Audit Logs
                </button>
                <button
                    className={`tab-btn ${activeTab === 'complaints' ? 'active' : ''}`}
                    onClick={() => setActiveTab('complaints')}
                >
                    🗂️ Complaints
                </button>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div className="table-container">
                            {users.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                    No users found.
                                </div>
                            ) : (
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u, i) => (
                                            <tr key={u.id || i}>
                                                <td style={{ color: 'var(--text-muted)' }}>#{u.id || i + 1}</td>
                                                <td><strong>{u.username}</strong></td>
                                                <td>{u.email || 'N/A'}</td>
                                                <td>
                                                    <span className="role-indicator">{u.role}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                    {/* Audit Logs Tab */}
                    {activeTab === 'audit' && (
                        <div className="table-container">
                            {auditLogs.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                    No audit logs found.
                                </div>
                            ) : (
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Timestamp</th>
                                            <th>User</th>
                                            <th>Action</th>
                                            <th>Resource</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {auditLogs.map((log, i) => (
                                            <tr key={log.id || i}>
                                                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                                    {log.timestamp ? new Date(log.timestamp).toLocaleString() : 'N/A'}
                                                </td>
                                                <td><strong>{log.username || log.user}</strong></td>
                                                <td>{log.action}</td>
                                                <td>{log.resource || log.endpoint}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                    {/* Complaints Tab */}
                    {activeTab === 'complaints' && (
                        <div className="table-container">
                            {complaints.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                    No complaints found.
                                </div>
                            ) : (
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Severity</th>
                                            <th>Type</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {complaints.map((c, i) => (
                                            <tr key={c.id || i}>
                                                <td style={{ color: 'var(--text-muted)' }}>#{c.id || i + 1}</td>
                                                <td><strong>{c.title}</strong></td>
                                                <td>
                                                    <span className={`badge ${getSeverityClass(c.severity)}`}>
                                                        {c.severity}
                                                    </span>
                                                </td>
                                                <td>{c.type}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteComplaint(c.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
