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
    <div className="min-h-screen gradient-mesh-light text-black dark:text-white font-mono flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <FileText size={80} className="mx-auto mb-8 text-black/30 dark:text-white/30" />
        <h1 className="text-4xl font-black mb-4">{title}</h1>
        <p className="text-lg mb-4 text-black/70 dark:text-white/70">{message}</p>
        {details && (
          <p className="text-sm text-black/50 dark:text-white/50 mb-8">
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