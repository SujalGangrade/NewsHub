//ArticleModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

const ArticleModal = ({ isOpen, onClose, article, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: 'Technology',
    author: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        content: article.content,
        image: article.image,
        category: article.category,
        author: article.author
      });
    } else {
      setFormData({
        title: '',
        content: '',
        image: '',
        category: 'Technology',
        author: ''
      });
    }
  }, [article, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {article ? 'Edit Article' : 'Create New Article'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter article title"
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter author name"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                required
                value={formData.content}
                onChange={handleChange}
                rows={10}
                className="input-field"
                placeholder="Write your article content here..."
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image URL
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Technology">Technology</option>
                <option value="Politics">Politics</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : article ? 'Update Article' : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleModal;