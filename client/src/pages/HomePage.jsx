import React from 'react';
import { useNews } from '../contexts/NewsContext';
import ArticleCard from '../components/ArticleCard';
import ArticleCardSkeleton from '../components/ArticleCardSkeleton';
import SearchAndFilter from '../components/SearchAndFilter';
import { Newspaper } from 'lucide-react';

const HomePage = () => {
  const { articles, loading, error } = useNews();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full">
              <Newspaper className="h-12 w-12 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Latest News & Updates
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay informed with the most recent news from around the world. 
            Discover breaking stories and in-depth analysis across various categories.
          </p>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter />

        {/* Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-gray-400 dark:text-gray-600 text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {articles.map((article, index) => (
              <div 
                key={article._id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;