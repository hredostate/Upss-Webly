import React from 'react';

type ErrorBoundaryState = {
  error: Error | null;
};

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

/**
 * Global safety net to prevent white screens when an unexpected runtime
 * error bubbles up. The boundary keeps production UX friendly while exposing
 * helpful debugging information during development.
 */
export class AppErrorBoundary extends React.Component<AppErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('Uncaught application error', error, info.componentStack);
    }

    if (!import.meta.env.DEV) {
      // Lightweight signal that can be wired to a log endpoint later
      window.dispatchEvent(new CustomEvent('app:error', { detail: { message: error.message } }));
    }
  }

  handleReload = () => {
    this.setState({ error: null });
    window.location.reload();
  };

  renderDebugPanel() {
    if (!import.meta.env.DEV || !this.state.error) return null;

    return (
      <details className="mt-4 w-full max-w-3xl bg-slate-900 text-slate-100 rounded-lg border border-slate-800 shadow-lg">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">Debug details</summary>
        <pre className="p-4 overflow-auto text-xs whitespace-pre-wrap">
          {this.state.error?.stack}
        </pre>
      </details>
    );
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-white px-6 text-center">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-semibold">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            Something went wrong
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-slate-900">We hit a snag while loading this page.</h1>
          <p className="text-slate-600 leading-relaxed">
            Please try reloading. If the problem persists, contact support with a short description of what you were doing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={this.handleReload}
              className="px-5 py-3 rounded-md bg-primary-900 text-white font-semibold shadow-sm hover:bg-primary-800 transition"
            >
              Reload page
            </button>
            <button
              onClick={() => this.setState({ error: null })}
              className="px-5 py-3 rounded-md bg-white text-primary-900 border border-primary-900 font-semibold shadow-sm hover:bg-primary-50 transition"
            >
              Dismiss
            </button>
          </div>
          {this.renderDebugPanel()}
        </div>
      </div>
    );
  }
}

