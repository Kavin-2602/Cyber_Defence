import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Decode JWT payload without a library
function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                // Check expiration
                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                } else {
                    setUser({
                        username: decoded.sub || decoded.username,
                        role: decoded.role || 'User',
                        email: decoded.email || '',
                    });
                }
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = decodeToken(token);
        if (decoded) {
            setUser({
                username: decoded.sub || decoded.username,
                role: decoded.role || 'User',
                email: decoded.email || '',
            });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const isAdmin = user?.role === 'Admin' || user?.role === 'ADMIN';

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
