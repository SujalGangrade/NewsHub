import React, { useState } from 'react';
import { X, User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CreateAdminModal = ({ isOpen, onClose }) => {
  const { createAdmin } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await createAdmin(formData);
    
    if (result.success) {
      setMessage({ 
        type: 'success', 
        text: 'Admin user created successfully!' 
      });
      setFormData({ username: '', email: '', password: '' });
      setTimeout(() => {
        onClose();
        setMessage({ type: '', text: '' });
      }, 2000);
    } else {
      setMessage({ 
        type: 'error', 
        text: result.error 
      });
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    setFormData({ username: '', email: '', password: '' });
    setMessage({ type: '', text: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Create Admin User
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {message.text && (
            <div className={`mb-4 p-4 rounded-lg flex items-center space-x-3 ${
              message.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
              )}
              <span className={`text-sm ${
                message.type === 'success' 
                  ? 'text-green-700 dark:text-green-300' 
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {message.text}
              </span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter password (min 6 characters)"
                  minLength={6}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminModal;