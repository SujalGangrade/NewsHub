import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useNews } from '../contexts/NewsContext';

const SearchAndFilter = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory 
  } = useNews();

  const categories = ['All', 'Technology', 'Politics', 'Sports', 'Entertainment'];

  return (
    <div className="card p-6 mb-8 animate-slide-up">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Filter className="text-gray-500 dark:text-gray-400 h-5 w-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field min-w-[150px]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;