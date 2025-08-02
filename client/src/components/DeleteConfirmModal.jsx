import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, articleTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Delete Article
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Are you sure you want to delete this article? This action cannot be undone.
          </p>
          {articleTitle && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <p className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                "{articleTitle}"
              </p>
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              Delete Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;