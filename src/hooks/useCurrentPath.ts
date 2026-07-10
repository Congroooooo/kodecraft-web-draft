import { useCallback, useEffect, useState } from 'react'

function getBrowserPath() {
  return window.location.pathname
}

export function useCurrentPath() {
  const [currentPath, setCurrentPath] = useState(getBrowserPath)

  const navigate = useCallback((path: string) => {
    if (path === window.location.pathname + window.location.hash) {
      return
    }
    if (path.includes('#')) {
      const [pathname, hash] = path.split('#')
      if (pathname && pathname !== window.location.pathname) {
        window.history.pushState({}, '', pathname)
      }
      if (hash) {
        const target = document.getElementById(hash)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.history.pushState({}, '', path)
        }
      }
      setCurrentPath(getBrowserPath())
      return
    }
    window.history.pushState({}, '', path)
    setCurrentPath(getBrowserPath())
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  useEffect(() => {
    const updateCurrentPath = () => setCurrentPath(getBrowserPath())

    window.addEventListener('popstate', updateCurrentPath)

    return () => window.removeEventListener('popstate', updateCurrentPath)
  }, [])

  return { currentPath, navigate }
}