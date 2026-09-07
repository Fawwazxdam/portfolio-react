import React, { useState, useEffect } from 'react';
import { Article } from '@phosphor-icons/react';
import { FileText, Calendar, User } from 'lucide-react';
import { Card, Button, LoadingSpinner, Section } from '../index.js';
import { useNavigate } from 'react-router-dom';

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
        if (!response.ok) throw new Error('Failed');
        const data = await response.json();
        setArticles(data.slice(0, 3));
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <Section id="articles" title="ARTICLES" icon={Article}>
        <div className="text-center py-8">
          <LoadingSpinner message="Loading articles..." size="h-12 w-12" />
        </div>
      </Section>
    );
  }

  if (articles.length === 0) return null;

  return (
    <Section id="articles" title="ARTICLES" icon={Article}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id}>
            <div className="flex items-center mb-3">
              <FileText size={24} className="mr-2 text-arcade-pink" />
              <h3 className="text-lg font-bold line-clamp-2">{article.title}</h3>
            </div>
            <p className="text-sm mb-3 leading-relaxed text-gray-500 dark:text-white/60 line-clamp-3">{article.content}</p>
            {article.tags && article.tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {article.tags.map((at) => (
                  <span key={at.tag.id} className="px-2 py-0.5 bg-arcade-pink/15 text-arcade-pink text-xs font-bold rounded-md">
                    {at.tag.name}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-white/40 mb-3">
              <div className="flex items-center">
                <User size={12} className="mr-1" />
                <span>{article.author?.name || 'Unknown'}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <Button
              className="w-full text-xs py-2"
              variant="outline"
              onClick={() => navigate(`/articles/${article.id}`)}
            >
              READ MORE
            </Button>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button variant="secondary" onClick={() => navigate('/articles')}>
          SEE MORE ARTICLES
        </Button>
      </div>
    </Section>
  );
};

export default ArticlesSection;
