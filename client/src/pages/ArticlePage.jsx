import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, Share2, User } from 'lucide-react';
import { useNews } from '../contexts/NewsContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ArticlePage = () => {
  const { id } = useParams();
  const { getArticleById } = useNews();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const data = await getArticleById(id);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id, getArticleById]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article URL copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Article Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center btn-primary"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 group transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Articles
        </Link>

        <article className="card overflow-hidden animate-fade-in">
          <div className="relative">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                <Tag className="h-4 w-4 mr-2" />
                {article.category}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{formatDate(article.publishDate)}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span>{article.author}</span>
                </div>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticlePage;