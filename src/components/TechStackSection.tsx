import { useEffect, useRef } from 'react'
import type { TechRoutingCard } from '../content/home/techStack'
import { techRoutingCards } from '../content/home/techStack'

// Horizontal route starts (% inside the panel). Chips begin near the top, then
// curve toward the bucket that owns their category.
const CHIP_LANES = [16, 48, 31, 68, 22, 56, 38, 76]
const CHIP_SPAWN_INTERVAL = 950
const CHIP_TRAVEL_DURATION = 5200

export function TechStackSection() {
  const dotsRef = useRef<HTMLCanvasElement>(null)

  useFallingDots(dotsRef)

  return (
    <section className="stack-section" id="stack" aria-labelledby="stack-title">
      <div className="section-shell stack-head">
        <p className="section-label" data-reveal>
          The stack
        </p>
        <h2 id="stack-title" data-reveal>
          The tools we build with, every day.
        </h2>
        <p className="stack-head-copy" data-reveal>
          A small, deliberate toolchain — Rust at the core, typed surfaces around it, and an
          agent-native platform underneath. Nothing here is along for the ride.
        </p>
      </div>

      <div className="stack-routing">
        <canvas className="stack-dots" ref={dotsRef} aria-hidden="true" />

        {techRoutingCards.map((card, index) => (
          <RoutingCard card={card} key={card.title} reverse={index % 2 === 1} />
        ))}
      </div>
    </section>
  )
}

function RoutingCard({ card, reverse }: { card: TechRoutingCard; reverse: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current

    if (!panel) {
      return
    }

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const chips = Array.from(panel.querySelectorAll<HTMLElement>('.routing-chip'))
    const buckets = Array.from(panel.querySelectorAll<HTMLElement>('.routing-bucket'))

    // Chip-routing animation now runs on every viewport; only reduced-motion
    // users fall back to the flat chip list. Mobile uses a stacked layout (copy
    // on top, animated panel below) — see App.css.
    const isStatic = () => mqReduce.matches
    const total = chips.length
    // Continuous cadence: chips spawn evenly across the period and the wrap
    // lines up seamlessly. Kept >= travel duration so a chip finishes before it
    // respawns (no self-overlap, no visible "restart").
    const period = Math.max(total * CHIP_SPAWN_INTERVAL, CHIP_TRAVEL_DURATION + CHIP_SPAWN_INTERVAL)

    let raf = 0
    let startTime = 0
    let running = false

    const frame = (now: number) => {
      if (!startTime) {
        startTime = now - CHIP_TRAVEL_DURATION * 0.28
      }

      const elapsed = now - startTime
      let active = -1
      let activePhase = -1
      const panelRect = panel.getBoundingClientRect()
      const bucketRects = buckets.map((bucket) => bucket.getBoundingClientRect())

      chips.forEach((chip, index) => {
        const chipTime = (elapsed - index * CHIP_SPAWN_INTERVAL + period) % period
        const phase = chipTime / CHIP_TRAVEL_DURATION
        const category = Number(chip.dataset.cat)
        const bucketRect = bucketRects[category]
        const chipRect = chip.getBoundingClientRect()
        const isVisible = phase >= 0 && phase <= 1
        const routeProgress = smoothstep(0.02, 0.82, phase)
        const arrivalProgress = smoothstep(0.62, 0.82, phase)
        const laneX = (CHIP_LANES[index % CHIP_LANES.length] / 100) * panelRect.width
        const targetX = bucketRect
          ? bucketRect.left - panelRect.left + bucketRect.width / 2 - chipRect.width / 2
          : laneX
        const startY = 24
        const targetY = bucketRect ? bucketRect.top - panelRect.top - chipRect.height - 18 : panelRect.height * 0.72
        const bendX = lerp(laneX, targetX, 0.62) + (category - 1) * 20
        const x = quadraticBezier(laneX, bendX, targetX, routeProgress)
        const y = lerp(startY, targetY, routeProgress)
        const opacity = isVisible
          ? smoothstep(0, 0.08, phase) * (1 - smoothstep(0.74, 0.86, phase))
          : 0
        const scale = lerp(0.96, 1.04, arrivalProgress) - smoothstep(0.8, 0.9, phase) * 0.08

        chip.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        chip.style.opacity = `${opacity}`

        // The visible chip nearest its bucket owns the highlight.
        if (opacity > 0.12 && phase > 0.3 && phase < 0.86 && phase > activePhase) {
          activePhase = phase
          active = category
        }
      })

      panel.dataset.activeCat = active >= 0 ? String(active) : ''
      buckets.forEach((bucket, index) => {
        bucket.classList.toggle('is-active', index === active)
      })

      raf = requestAnimationFrame(frame)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const start = () => {
      if (running || isStatic()) {
        return
      }
      running = true
      startTime = 0
      raf = requestAnimationFrame(frame)
    }

    // Hand layout back to CSS for the static (reduced-motion / mobile) case.
    const clearInline = () => {
      panel.dataset.activeCat = ''
      buckets.forEach((bucket) => bucket.classList.remove('is-active'))
      chips.forEach((chip) => chip.removeAttribute('style'))
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start()
        } else {
          stop()
        }
      },
      { threshold: 0.18 },
    )

    const applyMode = () => {
      if (isStatic()) {
        stop()
        clearInline()
        observer.unobserve(panel)
      } else {
        observer.observe(panel)
      }
    }

    applyMode()
    window.addEventListener('resize', applyMode)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', applyMode)
    }
  }, [card])

  return (
    <article className={`routing-card${reverse ? ' is-reverse' : ''}`} data-reveal>
      <div className="routing-panel" ref={panelRef}>
        <div className="routing-stream" aria-hidden="true">
          {card.chips.map((chip, index) => (
            <span className="routing-chip" data-cat={chip.cat} key={`${chip.label}-${index}`} title={chip.label}>
              <TechLogo label={chip.label} />
              <span className="routing-chip-label">{chip.label}</span>
            </span>
          ))}
        </div>

        <div className="routing-buckets">
          {card.categories.map((category, index) => (
            <div className="routing-bucket" data-cat={index} key={category}>
              <span className="routing-bucket-dot" />
              <span className="routing-bucket-label">{category}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="routing-copy">
        <p className="section-label">{card.eyebrow}</p>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
    </article>
  )
}

function TechLogo({ label }: { label: string }) {
  const shortLabel = getLogoLabel(label)

  return (
    <span className="routing-logo" aria-hidden="true" data-label={shortLabel}>
      {getLogoGlyph(label, shortLabel)}
    </span>
  )
}

function getLogoLabel(label: string) {
  const labels: Record<string, string> = {
    'Agent Orchestration': 'AO',
    'Agent Trace Logging': 'TL',
    'GitLab CI/CD': 'GL',
    'Guardrail Validation': 'GV',
    'MCP Servers': 'MCP',
    'Tool-Use Pipelines': 'TP',
    pgvector: 'pgv',
    PostgreSQL: 'pg',
    Proxmox: 'PX',
    SolidJS: 'S',
    TigerBeetle: 'TB',
    TigerData: 'TD',
    TypeScript: 'TS',
    wasmCloud: 'WC',
  }

  return labels[label] ?? label.slice(0, 2)
}

function getLogoGlyph(label: string, fallback: string) {
  if (label === 'Rust') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="11" stroke="currentColor" strokeWidth="3" />
        <path d="M24 7.5v5M24 35.5v5M40.5 24h-5M12.5 24h-5M34.7 13.3l-3.5 3.5M16.8 31.2l-3.5 3.5M34.7 34.7l-3.5-3.5M16.8 16.8l-3.5-3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
        <path d="M20 30V18h6.3c3 0 4.9 1.5 4.9 4 0 1.8-1 3-2.6 3.6l3.1 4.4h-4.2l-2.5-3.6h-1.2V30H20Zm3.8-6.4h2c1.3 0 2-.5 2-1.5s-.7-1.6-2-1.6h-2v3.1Z" fill="currentColor" />
      </svg>
    )
  }

  if (label === 'Axum') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M24 8 9 37h30L24 8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="3" />
        <path d="m18 29 6-10 6 10M21.5 25h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      </svg>
    )
  }

  if (label === 'TypeScript') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <rect width="38" height="38" x="5" y="5" fill="currentColor" rx="3" />
        <path d="M16 21h15M23.5 21v16M31 35c1.2 1.1 2.6 1.6 4.2 1.6 1.9 0 3.3-.9 3.3-2.4 0-1.4-.9-2-3.3-2.8-2.8-.9-4.4-2.1-4.4-4.6 0-2.7 2.2-4.5 5.3-4.5 1.7 0 3 .4 4.2 1.2" stroke="#07100b" strokeLinecap="round" strokeWidth="3" />
      </svg>
    )
  }

  if (label === 'React') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="3.8" fill="currentColor" />
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="2.8" />
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="2.8" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="2.8" transform="rotate(120 24 24)" />
      </svg>
    )
  }

  if (label === 'SolidJS') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M10 14c5-4 14-4 19 0 4 3 9 3 9 10 0 7-6 14-16 14-9 0-14-5-14-12 0-5 2-9 2-12Z" fill="currentColor" opacity="0.18" />
        <path d="M13 17c4-3 10-3 14 0 3 2 7 2 7 7 0 5-4 10-11 10-6 0-10-3-10-8 0-3 1.4-6 0-9Z" fill="currentColor" opacity="0.35" />
        <path d="M17 20c3-2 7-2 10 0 2 1.5 5 1.5 5 5 0 4-3.2 7-8 7-4.6 0-7.5-2.4-7.5-6.3 0-2.3 1-4.2.5-5.7Z" fill="currentColor" />
      </svg>
    )
  }

  if (label === 'PostgreSQL') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M17 28c-1-7 .5-14 7-14 6.5 0 8 6.6 7 14-1 7-4.5 10-7 10s-6-3-7-10Z" stroke="currentColor" strokeWidth="3" />
        <path d="M21 20c1.7-1.6 4.3-1.6 6 0M18 29c2 1 4.7 1.5 6 1.5S28 30 30 29M30 24l4 2-4 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      </svg>
    )
  }

  if (label === 'Playwright') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M13 14c0-3 2-5 5-5h12c3 0 5 2 5 5v20c0 3-2 5-5 5H18c-3 0-5-2-5-5V14Z" stroke="currentColor" strokeWidth="3" />
        <circle cx="19" cy="20" r="2.5" fill="currentColor" />
        <circle cx="29" cy="20" r="2.5" fill="currentColor" />
        <path d="M18 30c1.6 2 3.6 3 6 3s4.4-1 6-3" stroke="currentColor" strokeLinecap="round" strokeWidth="2.8" />
      </svg>
    )
  }

  if (label === 'Docker') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M9 25h26c0 7-5 12-13 12-7 0-12-4-13-12Z" fill="currentColor" opacity="0.9" />
        <path d="M12 17h5v5h-5v-5Zm7 0h5v5h-5v-5Zm7 0h5v5h-5v-5Zm-7-7h5v5h-5v-5Zm7 7h5v5h-5v-5Zm7 0h5v5h-5v-5Z" fill="currentColor" />
        <path d="M36 20c2.8-.2 4.8.8 6 3-2 .8-3.8.8-5.5.2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    )
  }

  if (label === 'Terraform') {
    return (
      <svg className="routing-logo-svg" fill="currentColor" viewBox="0 0 48 48">
        <path d="M8 8v12l10 5.8v-12L8 8Zm12 6.8v12l10 5.8v-12l-10-5.8Zm12 5.8v12l10-5.8v-12l-10 5.8ZM20 29.2v12L30 47V35l-10-5.8Z" />
      </svg>
    )
  }

  if (label === 'GitLab CI/CD') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="m24 38 8-12H16l8 12Z" fill="currentColor" />
        <path d="m10 26 6-18 8 18H10Zm28 0-6-18-8 18h14Z" fill="currentColor" opacity="0.72" />
        <path d="m10 26 14 12L38 26" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.5" />
      </svg>
    )
  }

  if (label === 'Vault') {
    return (
      <svg className="routing-logo-svg" fill="currentColor" viewBox="0 0 48 48">
        <path d="M24 7 10 15v18l14 8 14-8V15L24 7Zm0 5.2 8.6 4.8v11.1L24 33l-8.6-4.9V17l8.6-4.8Z" />
      </svg>
    )
  }

  if (label === 'Consul') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M11 24c0-7.2 5.8-13 13-13 4.4 0 8.3 2.2 10.7 5.5l-4.7 2.4c-1.3-1.8-3.5-2.9-6-2.9-4.4 0-8 3.6-8 8s3.6 8 8 8c2.5 0 4.7-1.1 6-2.9l4.7 2.4C32.3 34.8 28.4 37 24 37c-7.2 0-13-5.8-13-13Z" fill="currentColor" />
      </svg>
    )
  }

  if (label === 'Nomad') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M24 9 11 16.5v15L24 39l13-7.5v-15L24 9Z" stroke="currentColor" strokeWidth="3" />
        <path d="M18 30V18l12 12V18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      </svg>
    )
  }

  if (label === 'Claude') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M24 10c8 0 14 6 14 14s-6 14-14 14S10 32 10 24 16 10 24 10Z" stroke="currentColor" strokeWidth="3" />
        <path d="M30 19c-1.6-1.5-3.6-2.2-6-2.2-4.5 0-7.8 3-7.8 7.2s3.3 7.2 7.8 7.2c2.4 0 4.4-.7 6-2.2" stroke="currentColor" strokeLinecap="round" strokeWidth="2.8" />
      </svg>
    )
  }

  if (label === 'Leptos') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M13 35 24 11l11 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <path d="M18.5 25h11" stroke="currentColor" strokeLinecap="round" strokeWidth="2.8" />
      </svg>
    )
  }

  if (label === 'wasmCloud') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M12 24c0-6.4 5.2-11.5 11.5-11.5 4.4 0 8.3 2.5 10.2 6.1 4.2.3 7.3 3.4 7.3 7.2 0 4-3.3 7.2-7.5 7.2H18.5C14.9 33 12 29.1 12 24Z" stroke="currentColor" strokeWidth="3" />
        <path d="m18 26 4-5 4 4 4-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
      </svg>
    )
  }

  if (label === 'pgvector') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <circle cx="16" cy="18" r="3" fill="currentColor" />
        <circle cx="31" cy="15" r="3" fill="currentColor" />
        <circle cx="24" cy="31" r="3" fill="currentColor" />
        <path d="M18.5 19.5 28.5 16.5M18 20.5l5 8M29 18l-4 10" stroke="currentColor" strokeLinecap="round" strokeWidth="2.6" />
      </svg>
    )
  }

  if (label === 'MCP Servers') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <rect width="28" height="18" x="10" y="15" rx="3" stroke="currentColor" strokeWidth="3" />
        <path d="M17 21v6M24 19v10M31 21v6" stroke="currentColor" strokeLinecap="round" strokeWidth="2.8" />
      </svg>
    )
  }

  if (label === 'OpenAI') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M24 7c5 0 8 3 9 7 4 1 7 5 7 10s-3 8-7 10c-1 4-4 7-9 7s-8-3-10-7c-4-1-6-5-6-10s2-9 6-10c2-4 5-7 10-7Z" stroke="currentColor" strokeWidth="3" />
        <path d="M17 18l7-4 7 4v12l-7 4-7-4V18Z" stroke="currentColor" strokeWidth="3" />
      </svg>
    )
  }

  return <span className="routing-logo-text">{fallback}</span>
}

// Drifting particle field behind the routing cards.
function useFallingDots(ref: React.RefObject<HTMLCanvasElement | null>) {
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

// Smooth 0..1 ramp between two edges (Hermite).
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1)
  return t * t * (3 - 2 * t)
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t
}

function quadraticBezier(from: number, control: number, to: number, t: number) {
  return (1 - t) * (1 - t) * from + 2 * (1 - t) * t * control + t * t * to
}
