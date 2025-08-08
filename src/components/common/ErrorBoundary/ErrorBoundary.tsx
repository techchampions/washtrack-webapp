import React, { Component, ReactNode } from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import { Button } from '@/components/common/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log to error reporting service in production
    if (import.meta.env.PROD) {
      // Example: Sentry.captureException(error, { contexts: { errorInfo } });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <FiAlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Please try again or refresh the page.
            </p>

            {/* Error details in development */}
            {import.meta.env.DEV && this.state.error && (
              <details className="text-left mb-6">
                <summary className="text-sm font-medium text-gray-700 cursor-pointer mb-2">
                  Error Details (Development Mode)
                </summary>
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-xs text-red-700 font-mono">
                    {this.state.error.name}: {this.state.error.message}
                  </p>
                  {this.state.error.stack && (
                    <pre className="text-xs text-red-600 mt-2 overflow-auto">
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              </details>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleRetry}
                leftIcon={<FiRefreshCw className="w-4 h-4" />}
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={this.handleReload}
              >
                Reload Page
              </Button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              If this problem persists, please contact{' '}
              <a
                href="mailto:support@washtrack.com"
                className="text-indigo-600 hover:text-indigo-500"
              >
                support@washtrack.com
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}