//AdminDashboard.jsx

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, UserPlus } from 'lucide-react';
import { useNews } from '../contexts/NewsContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ArticleModal from '../components/ArticleModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import CreateAdminModal from '../components/CreateAdminModal';

const AdminDashboard = () => {
  const { articles, loading, createArticle, updateArticle, deleteArticle } = useNews();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deletingArticle, setDeletingArticle] = useState(null);

  const handleCreateArticle = () => {
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  const handleCreateAdmin = () => {
    setIsCreateAdminModalOpen(true);
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (article) => {
    setDeletingArticle(article);
    setIsDeleteModalOpen(true);
  };

  const handleSaveArticle = async (articleData) => {
    try {
      if (editingArticle) {
        await updateArticle(editingArticle._id, articleData);
      } else {
        await createArticle(articleData);
      }
      setIsModalOpen(false);
      setEditingArticle(null);
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteArticle(deletingArticle._id);
      setIsDeleteModalOpen(false);
      setDeletingArticle(null);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your news articles and content {user?.role === 'super_admin' && '• Super Admin'}
            </p>
          </div>
          <div className="flex space-x-4">
            {user?.role === 'super_admin' && (
              <button
                onClick={handleCreateAdmin}
                className="btn-secondary flex items-center space-x-2"
              >
                <UserPlus className="h-5 w-5" />
                <span>Create Admin</span>
              </button>
            )}
            <button
              onClick={handleCreateArticle}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>New Article</span>
            </button>
          </div>
        </div>

        <div className="card overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : articles.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      No articles found. Create your first article to get started.
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr key={article._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="h-12 w-16 object-cover rounded-lg mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                              {article.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {article.content.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {article.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(article.publishDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/article/${article._id}`}
                            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                            title="View Article"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleEditArticle(article)}
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200"
                            title="Edit Article"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(article)}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                            title="Delete Article"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        article={editingArticle}
        onSave={handleSaveArticle}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        articleTitle={deletingArticle?.title}
      />

      <CreateAdminModal
        isOpen={isCreateAdminModalOpen}
        onClose={() => setIsCreateAdminModalOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;