import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, User } from 'lucide-react';
import Card from './Card.jsx';
import Button from './Button.jsx';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  return (
    <Card animated={true}>
      <div className="flex items-center mb-4">
        <FileText size={24} className="mr-3" />
        <h3 className="text-xl font-bold line-clamp-2">{article.title}</h3>
      </div>

      <p className="mb-4 leading-relaxed line-clamp-3">{article.content}</p>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {article.tags.map((articleTag) => (
            <span
              key={articleTag.tag.id}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs font-bold rounded"
            >
              {articleTag.tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm opacity-70">
        <div className="flex items-center">
          <User size={16} className="mr-1" />
          <span>{article.author?.name || 'Unknown Author'}</span>
        </div>
        <div className="flex items-center">
          <Calendar size={16} className="mr-1" />
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Comments count */}
      {article.comments && article.comments.length > 0 && (
        <div className="mt-2 text-sm opacity-70">
          💬 {article.comments.length} comment{article.comments.length !== 1 ? 's' : ''}
        </div>
      )}

      <Button
        className="w-full mt-4 text-sm py-2"
        variant="outline"
        onClick={() => navigate(`/articles/${article.id}`)}
      >
        READ MORE
      </Button>
    </Card>
  );
};

export default ArticleCard;