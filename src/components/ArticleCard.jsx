import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, User } from 'lucide-react';
import Card from './Card.jsx';
import Button from './Button.jsx';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  return (
    <Card animated={true}>
      <div className="flex items-center mb-3">
        <FileText size={20} className="mr-2 text-arcade-pink" />
        <h3 className="text-base font-bold line-clamp-2">{article.title}</h3>
      </div>

      <p className="mb-3 leading-relaxed line-clamp-3 text-sm text-gray-500 dark:text-white/60">{article.content}</p>

      {article.tags && article.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {article.tags.map((articleTag) => (
            <span
              key={articleTag.tag.id}
              className="px-2 py-0.5 bg-arcade-pink/15 text-arcade-pink text-xs font-bold rounded-md"
            >
              {articleTag.tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400 dark:text-white/40">
        <div className="flex items-center">
          <User size={12} className="mr-1" />
          <span>{article.author?.name || 'Unknown'}</span>
        </div>
        <div className="flex items-center">
          <Calendar size={12} className="mr-1" />
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {article.comments && article.comments.length > 0 && (
        <div className="mt-2 text-xs text-gray-400 dark:text-white/40">
          {article.comments.length} comment{article.comments.length !== 1 ? 's' : ''}
        </div>
      )}

      <Button
        className="w-full mt-3 text-xs py-2"
        variant="outline"
        onClick={() => navigate(`/articles/${article.id}`)}
      >
        READ MORE
      </Button>
    </Card>
  );
};

export default ArticleCard;
