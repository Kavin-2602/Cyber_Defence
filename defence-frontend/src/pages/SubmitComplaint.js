import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import './SubmitComplaint.css';

const SEVERITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH'];
const TYPE_OPTIONS = ['Cyber', 'Infrastructure', 'Personnel', 'Equipment', 'Intelligence', 'Other'];

export default function SubmitComplaint() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('MEDIUM');
    const [type, setType] = useState('Cyber');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await API.post('/complaints', { title, description, severity, type });
            toast.success('Complaint submitted successfully!');
            navigate('/complaints');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit complaint.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Submit Complaint</h1>
            <p className="page-subtitle">Report a new defence-related complaint</p>

            <div className="card submit-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="complaint-title">Title</label>
                        <input
                            id="complaint-title"
                            className="form-input"
                            type="text"
                            placeholder="Brief complaint title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="complaint-desc">Description</label>
                        <textarea
                            id="complaint-desc"
                            className="form-textarea"
                            placeholder="Provide a detailed description of the complaint..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={5}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="complaint-severity">Severity</label>
                            <select
                                id="complaint-severity"
                                className="form-select"
                                value={severity}
                                onChange={(e) => setSeverity(e.target.value)}
                            >
                                {SEVERITY_OPTIONS.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="complaint-type">Type</label>
                            <select
                                id="complaint-type"
                                className="form-select"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                {TYPE_OPTIONS.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem' }}>
                        {loading ? 'Submitting...' : '📡 Submit Complaint'}
                    </button>
                </form>
            </div>
        </div>
    );
}
