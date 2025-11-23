import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { useTheme } from './ThemeContext.jsx';
import {
  Button,
  LoadingSpinner,
  ErrorMessage,
  ArticleCard,
  Navbar
} from './components/index.js';

const Articles = () => {
  const { isDarkMode } = useTheme();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch from your backend API
        const response = await fetch('http://localhost:4000/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles from backend');
        }
        const data = await response.json();
        // Filter only published articles
        const publishedArticles = data.filter(article => article.published);
        setArticles(publishedArticles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading articles..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Error Loading Articles"
        message={error}
        details="Make sure your backend server is running on http://localhost:4000"
        showRetryButton={true}
        onRetry={() => window.location.reload()}
        showHomeButton={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-mono">
      {/* Navigation */}
      <Navbar currentPage="articles" />

      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <FileText size={80} className="mx-auto mb-8" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            ARTICLES
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Latest articles and insights from the world of web development
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black dark:bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg">© 2024 Adam Fawwaz Haq. Crafted with ❤️ and lots of ☕</p>
        </div>
      </footer>
    </div>
  );
};

export default Articles;