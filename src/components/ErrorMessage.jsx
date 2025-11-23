import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import Button from './Button.jsx';

const ErrorMessage = ({
  title = 'Error',
  message,
  details,
  showHomeButton = true,
  showRetryButton = false,
  onRetry
}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-mono flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <FileText size={80} className="mx-auto mb-8 opacity-50" />
        <h1 className="text-4xl font-black mb-4">{title}</h1>
        <p className="text-lg mb-4">{message}</p>
        {details && (
          <p className="text-sm opacity-70 mb-8">
            {details}
          </p>
        )}
        <div className="space-y-4">
          {showRetryButton && onRetry && (
            <Button onClick={onRetry}>
              TRY AGAIN
            </Button>
          )}
          {showHomeButton && (
            <>
              {showRetryButton && <br />}
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft size={20} className="mr-2" />
                  BACK TO HOME
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;