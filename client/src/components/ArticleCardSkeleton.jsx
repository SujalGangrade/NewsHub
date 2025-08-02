import React from 'react';

const ArticleCardSkeleton = () => {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
        </div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;