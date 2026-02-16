import React, { useState, useEffect, useCallback } from 'react';
import API from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import './ComplaintList.css';

const SEVERITY_OPTIONS = ['All', 'HIGH', 'MEDIUM', 'LOW'];
const TYPE_OPTIONS = ['All', 'Cyber', 'Infrastructure', 'Personnel', 'Equipment', 'Intelligence', 'Other'];
const PAGE_SIZE = 10;

export default function ComplaintList() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [severity, setSeverity] = useState('All');
    const [type, setType] = useState('All');

    const fetchComplaints = useCallback(async () => {
        setLoading(true);
        try {
            const params = { page: page - 1, size: PAGE_SIZE };
            if (severity !== 'All') params.severity = severity;
            if (type !== 'All') params.type = type;

            const res = await API.get('/complaints', { params });

            // Always expect paginated response from backend now
            setComplaints(res.data.content || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error('Failed to fetch complaints:', err);
            setComplaints([]);
        } finally {
            setLoading(false);
        }
    }, [page, severity, type]);

    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);

    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
        setPage(1);
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
            <h1 className="page-title">Complaint Registry</h1>
            <p className="page-subtitle">Browse and filter all submitted complaints</p>

            {/* Filters */}
            <div className="filters-bar">
                <div className="form-group">
                    <label className="form-label" htmlFor="filter-severity">Severity</label>
                    <select
                        id="filter-severity"
                        className="form-select"
                        value={severity}
                        onChange={handleFilterChange(setSeverity)}
                    >
                        {SEVERITY_OPTIONS.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="filter-type">Type</label>
                    <select
                        id="filter-type"
                        className="form-select"
                        value={type}
                        onChange={handleFilterChange(setType)}
                    >
                        {TYPE_OPTIONS.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : complaints.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No complaints found.</p>
                </div>
            ) : (
                <>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Severity</th>
                                    <th>Type</th>
                                    <th>Description</th>
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
                                        <td className="desc-cell">{c.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="pagination">
                        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                            ← Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                className={page === i + 1 ? 'active' : ''}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                            Next →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
