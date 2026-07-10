import { useEffect, useRef } from 'react'
import { useFallingDots } from '../hooks/useFallingDots'
import { TechLogo } from './TechLogo'
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
