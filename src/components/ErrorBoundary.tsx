import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled app error', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-svh place-items-center bg-kc-bg px-kc-gutter text-kc-text">
          <section className="max-w-xl border border-[rgba(240,245,255,0.16)] bg-[rgba(20,30,48,0.72)] p-8 shadow-2xl shadow-black/30">
            <p className="mb-3 font-kc-heading text-sm font-bold uppercase tracking-[0.16em] text-kc-brand">
              KodeCraft
            </p>
            <h1 className="font-kc-heading text-3xl font-bold tracking-[-0.03em]">Something went wrong.</h1>
            <p className="mt-4 leading-7 text-kc-muted">
              Refresh the page to try again. If the issue continues, contact the KodeCraft team.
            </p>
            <a
              className="mt-7 inline-flex min-h-12 items-center bg-kc-brand px-5 font-kc-heading text-sm font-bold uppercase tracking-[0.08em] text-[#07100b]"
              href="/"
            >
              Reload home
            </a>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}
