import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { useTheme } from '../ThemeContext.jsx';
import {
  Button,
  LoadingSpinner,
  ErrorMessage,
  ArticleCard,
  Navbar,
  Footer
} from '../components/index.js';

const Articles = () => {
  const { isDarkMode } = useTheme();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch from your backend API
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles from backend');
        }
        const data = await response.json();
        setArticles(data);
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
        details={`Make sure your backend server is running on ${import.meta.env.VITE_API_BASE_URL}`}
        showRetryButton={true}
        onRetry={() => window.location.reload()}
        showHomeButton={true}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-gray-900 dark:text-white font-mono overflow-x-hidden gradient-mesh-light scanline-overlay">
      {/* Navigation */}
      <Navbar currentPage="articles" />

      <div className="flex-grow">
        {/* Header */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <FileText size={48} className="mx-auto mb-8 text-arcade-orange" />
            <h1 className="font-pixel text-2xl md:text-5xl text-arcade-orange neon-orange mb-4">
              ARTICLES
            </h1>
            <p className="text-sm text-gray-400 dark:text-white/40 max-w-lg mx-auto">
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
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Articles;