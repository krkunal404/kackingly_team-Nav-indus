import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-card empty-state" style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}>
          <div className="empty-icon-wrap" style={{ color: '#ef4444' }}>
            <AlertTriangle size={36} />
          </div>
          <h3 style={{ color: '#ef4444' }}>Component Error Encountered</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', wordBreak: 'break-word' }}>
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>
          <button 
            className="btn-scan" 
            style={{ width: 'auto', padding: '0.6rem 1.5rem', marginTop: '1rem' }}
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
