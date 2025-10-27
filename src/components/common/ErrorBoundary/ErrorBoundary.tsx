import React, { Component, ReactNode } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import { Button } from "@/components/common/Button";

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
    console.error("ErrorBoundary caught an error:", error, errorInfo);

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
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
          <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full">
              <FiAlertTriangle className="w-8 h-8 text-red-600" />
            </div>

            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Oops! Something went wrong
            </h1>

            <p className="mb-6 text-gray-600">
              We're sorry, but something unexpected happened. Please try again
              or refresh the page.
            </p>

            {/* Error details in development */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="mb-2 text-sm font-medium text-gray-700 cursor-pointer">
                  Error Details (Development Mode)
                </summary>
                <div className="p-3 border border-red-200 rounded-md bg-red-50">
                  <p className="font-mono text-xs text-red-700">
                    {this.state.error.name}: {this.state.error.message}
                  </p>
                  {this.state.error.stack && (
                    <pre className="mt-2 overflow-auto text-xs text-red-600">
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                onClick={this.handleRetry}
                leftIcon={<FiRefreshCw className="w-4 h-4" />}
              >
                Try Again
              </Button>
              <Button variant="outline" onClick={this.handleReload}>
                Reload Page
              </Button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              If this problem persists, please contact{" "}
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
