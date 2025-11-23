import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { ArticleCard, Button, LoadingSpinner, ErrorMessage } from './index.js';

const FeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        // Filter only published articles and take first 3
        const publishedArticles = data.filter(article => article.published).slice(0, 3);
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
    return (
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <LoadingSpinner message="Loading featured articles..." size="h-16 w-16" />
        </div>
      </div>
    );
  }

  if (error) {
    // Don't show error prominently on home page, just skip the section
    return null;
  }

  if (articles.length === 0) {
    return null; // Don't show section if no articles
  }

  return (
    <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <FileText size={60} className="mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-mono font-black mb-6">
            LATEST ARTICLES
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Insights and thoughts on web development, technology, and programming
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/articles">
            <Button variant="secondary">
              SEE MORE ARTICLES
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;