import React, { useState, useEffect } from 'react';
import API from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Dashboard.css';

const SEVERITY_COLORS = {
    HIGH: '#ef4444',
    MEDIUM: '#f59e0b',
    LOW: '#22c55e',
};

const TYPE_COLORS = ['#3b82f6', '#8b5cf6', '#14b8a6', '#f59e0b', '#ef4444', '#ec4899'];

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await API.get('/complaints/stats');
            setStats(res.data);
        } catch (err) {
            console.error('Failed to fetch dashboard stats:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!stats) return <div className="page-container"><div className="chart-empty">Failed to load mission intelligence.</div></div>;

    const totalComplaints = stats.total || 0;
    const severityData = [
        { name: 'High', value: stats.severity?.HIGH || 0, color: SEVERITY_COLORS.HIGH },
        { name: 'Medium', value: stats.severity?.MEDIUM || 0, color: SEVERITY_COLORS.MEDIUM },
        { name: 'Low', value: stats.severity?.LOW || 0, color: SEVERITY_COLORS.LOW },
    ].filter(d => d.value > 0);

    const typeData = Object.entries(stats.type || {}).map(([name, count]) => ({ name, count })).filter(d => d.count > 0);

    return (
        <div className="page-container">
            <h1 className="page-title">Mission Dashboard</h1>
            <p className="page-subtitle">Real-time complaint intelligence overview</p>

            {/* Stat Cards */}
            <div className="stats-grid">
                <div className="stat-card total">
                    <div className="stat-label">Total Complaints</div>
                    <div className="stat-value">{totalComplaints}</div>
                </div>
                <div className="stat-card high">
                    <div className="stat-label">High Risk</div>
                    <div className="stat-value">{stats.severity?.HIGH || 0}</div>
                </div>
                <div className="stat-card medium">
                    <div className="stat-label">Medium Risk</div>
                    <div className="stat-value">{stats.severity?.MEDIUM || 0}</div>
                </div>
                <div className="stat-card low" style={{ '--card-color': 'var(--severity-low)' }}>
                    <div className="stat-label">Low Risk</div>
                    <div className="stat-value">{stats.severity?.LOW || 0}</div>
                </div>
            </div>

            {/* Charts */}
            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Severity Distribution</h3>
                    {severityData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={severityData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {severityData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: '#111d35',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: '#e8edf5',
                                    }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="chart-empty">No complaint data available</div>
                    )}
                </div>

                <div className="chart-card">
                    <h3>Type Distribution</h3>
                    {typeData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={typeData}>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: '#8899b4', fontSize: 12 }}
                                    axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                                />
                                <YAxis
                                    tick={{ fill: '#8899b4', fontSize: 12 }}
                                    axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: '#111d35',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: '#e8edf5',
                                    }}
                                />
                                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                    {typeData.map((_, i) => (
                                        <Cell key={i} fill={TYPE_COLORS[i % TYPE_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="chart-empty">No complaint data available</div>
                    )}
                </div>
            </div>
        </div>
    );
}
