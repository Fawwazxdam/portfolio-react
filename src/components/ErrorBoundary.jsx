import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 text-white p-8 font-mono">
          <h1 className="text-2xl font-pixel text-red-400 mb-4">⚠ Runtime Error</h1>
          <pre className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-4 text-sm overflow-auto whitespace-pre-wrap">
            {this.state.error?.toString()}
          </pre>
          {this.state.errorInfo && (
            <pre className="bg-red-900/10 border border-red-500/20 rounded-xl p-4 text-xs overflow-auto whitespace-pre-wrap text-gray-400">
              {this.state.errorInfo.componentStack}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
