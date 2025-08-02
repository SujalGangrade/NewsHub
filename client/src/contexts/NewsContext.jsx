//NewsContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('https://newshub-8c6a.onrender.com/api/news');
      setArticles(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (articleData) => {
    try {
      const response = await axios.post('https://newshub-8c6a.onrender.com/api/news', articleData);
      const newArticle = response.data.data;
      setArticles(prev => [newArticle, ...prev]);
      return { success: true, article: newArticle };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create article' 
      };
    }
  };

  const updateArticle = async (id, articleData) => {
    try {
      const response = await axios.put(`https://newshub-8c6a.onrender.com/api/news/${id}`, articleData);
      const updatedArticle = response.data.data;
      setArticles(prev => prev.map(article => 
        article._id === id ? updatedArticle : article
      ));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update article' 
      };
    }
  };

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`https://newshub-8c6a.onrender.com/api/news/${id}`);
      setArticles(prev => prev.filter(article => article._id !== id));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete article' 
      };
    }
  };

  const getArticleById = async (id) => {
    try {
      const response = await axios.get(`https://newshub-8c6a.onrender.com/api/news/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch article');
    }
  };

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory && article.isPublished;
  });

  const value = {
    articles: filteredArticles,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
    loadArticles,
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};