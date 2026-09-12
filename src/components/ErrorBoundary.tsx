import { Component } from 'react';
import type { ReactNode } from 'react';
import Button from './Button';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error): void {
    // Local-first: just log; nothing sensitive leaves the device.
    console.error('ErrorBoundary caught:', error);
  }

  private reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="error-boundary" role="alert">
          <h2 className="error-boundary-title">Something went wrong</h2>
          <p className="error-boundary-msg">{error.message || 'An unexpected error occurred.'}</p>
          <Button variant="primary" onClick={this.reset}>
            Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
