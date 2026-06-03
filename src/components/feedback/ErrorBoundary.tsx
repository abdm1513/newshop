import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">😢</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              እንደአጋጣሚ ሆኖ ስህተት ተፈጥሯል
            </h1>
            <p className="text-gray-600 mb-4">
              እባክዎ ገጹን እንደገና ይጫኑ ወይም በኋላ ይሞክሩ
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              ገጹን እንደገና ጫን
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}