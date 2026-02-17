import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import ComplaintList from './pages/ComplaintList';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import AccessDenied from './pages/AccessDenied';
import DefenceBot from './components/DefenceBot';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/submit-complaint" element={<ProtectedRoute><SubmitComplaint /></ProtectedRoute>} />
                    <Route path="/complaints" element={<ProtectedRoute><ComplaintList /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/access-denied" element={<ProtectedRoute><AccessDenied /></ProtectedRoute>} />

                    {/* Admin-only Route */}
                    <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />

                    {/* Default redirect */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <DefenceBot />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
