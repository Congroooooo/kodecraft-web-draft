import { type RefObject, useEffect } from 'react'

export function useFallingDots(ref: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = ref.current

    if (!canvas) {
      return
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      return
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = []
    let raf = 0
    let running = false

    const seed = (index: number) => {
      // Deterministic pseudo-random so we avoid Math.random churn per particle.
      const s = Math.sin(index * 12.9898) * 43758.5453
      return s - Math.floor(s)
    }

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(150, Math.floor((width * height) / 14000))
      particles = Array.from({ length: count }, (_, index) => ({
        x: seed(index) * width,
        y: seed(index + 99) * height,
        vx: 0.08 + seed(index + 7) * 0.18,
        vy: 0.25 + seed(index + 31) * 0.5,
        r: 0.6 + seed(index + 53) * 1.4,
        a: 0.12 + seed(index + 71) * 0.4,
      }))
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.y > height + 4) {
          p.y = -4
          p.x = seed(Math.floor(p.x)) * width
        }
        if (p.x > width + 4) {
          p.x = -4
        }

        context.beginPath()
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        context.fillStyle = `rgba(148, 163, 184, ${p.a})`
        context.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    build()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true
          raf = requestAnimationFrame(draw)
        } else if (!entry.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )

    observer.observe(canvas)
    window.addEventListener('resize', build)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
    }
  }, [ref])
}
