import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { NewsProvider } from './contexts/NewsContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <NewsProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/article/:id" element={<ArticlePage />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </div>
            </Router>
          </NewsProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;