import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Calendar, User, ArrowLeft, MessageCircle } from 'lucide-react';
import { useTheme } from '../ThemeContext.jsx';
import {
  Button,
  LoadingSpinner,
  ErrorMessage,
  Navbar,
  Card
} from '../components/index.js';

const ArticleDetail = () => {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentForm, setCommentForm] = useState({
    name: '',
    content: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article from backend');
        }
        const data = await response.json();
        setArticle(data);
        setComments(data.comments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.content.trim()) return;

    setSubmittingComment(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId: parseInt(id),
          authorId: 1, // Default author ID
          content: commentForm.content
        })
      });

      if (response.ok) {
        const newComment = await response.json();
        // Add author info manually since API might not include it
        const commentWithAuthor = {
          ...newComment,
          author: {
            id: 1,
            name: commentForm.name || 'Anonymous',
            email: '',
            phone_number: ''
          }
        };
        setComments(prev => [...prev, commentWithAuthor]);
        setCommentForm({ name: '', content: '' });
        alert('Comment added successfully!');
      } else {
        alert('Failed to add comment');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading article..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Error Loading Article"
        message={error}
        details={`Make sure your backend server is running on ${import.meta.env.VITE_API_BASE_URL}`}
        showRetryButton={true}
        onRetry={() => window.location.reload()}
        showHomeButton={true}
      />
    );
  }

  if (!article) {
    return (
      <ErrorMessage
        title="Article Not Found"
        message="The article you're looking for doesn't exist."
        showHomeButton={true}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-mono">
      {/* Navigation */}
      <Navbar currentPage="articles" />

      <div className="flex-grow">
        {/* Back Button */}
        <section className="pt-24 pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={() => navigate('/articles')}
              className="mb-6"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Articles
            </Button>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <FileText size={32} className="mr-4" />
              <h1 className="text-3xl md:text-5xl font-black">{article.title}</h1>
            </div>

            <div className="flex items-center justify-between text-sm opacity-70 mb-8">
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>{article.author?.name || 'Unknown Author'}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {article.tags.map((articleTag) => (
                  <span
                    key={articleTag.tag.id}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm font-bold rounded"
                  >
                    {articleTag.tag.name}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed whitespace-pre-line">{article.content}</p>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <MessageCircle size={32} className="mr-4" />
              <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
            </div>

            {/* Add Comment Form */}
            <Card className="mb-8">
              <h3 className="text-xl font-bold mb-4">Leave a Comment</h3>
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div>
                  <label className="block font-bold mb-2">Name</label>
                  <input
                    type="text"
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({...commentForm, name: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Comment</label>
                  <textarea
                    value={commentForm.content}
                    onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                    rows="4"
                    placeholder="Write your comment here..."
                    required
                  />
                </div>
                <Button type="submit" disabled={submittingComment}>
                  {submittingComment ? 'Posting...' : 'Post Comment'}
                </Button>
              </form>
            </Card>

            {/* Comments List */}
            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <div className="flex items-center mb-2">
                      <User size={16} className="mr-2" />
                      <span className="font-semibold">{comment.author?.name || 'Anonymous'}</span>
                      <span className="ml-4 text-sm opacity-70">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center opacity-70">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black dark:bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg">© 2024 Adam Fawwaz Haq. Crafted with ❤️ and lots of ☕</p>
        </div>
      </footer>
    </div>
  );
};

export default ArticleDetail;