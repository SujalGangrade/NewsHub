import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, User } from 'lucide-react';

const ArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technology: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      Politics: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      Sports: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      Entertainment: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <div className="card hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
            <Tag className="h-3 w-3 mr-1" />
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm mb-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(article.publishDate)}
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {article.author}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {article.content}
        </p>
        
        <Link
          to={`/article/${article._id}`}
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold group-hover:underline transition-all duration-200"
        >
          Read More
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;