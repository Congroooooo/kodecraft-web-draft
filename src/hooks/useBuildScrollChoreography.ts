import { type RefObject, useEffect } from 'react'

export function useBuildScrollChoreography(sectionRef: RefObject<HTMLElement | null>, itemCount: number) {
  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Pinned crossfade runs on every viewport now; only reduced-motion users get
    // the flat static stack. Mobile uses a single-column frame (see App.css).
    const isStatic = () => mqReduce.matches
    const total = itemCount
    // Fraction of each item's equal scroll segment where the item is held fully
    // visible before morphing to the next. Higher = longer dwell, shorter morph.
    const dwell = 0.5

    // Map raw scroll progress (0..1) to a continuous item index. Each item owns
    // an equal slice (1 / total) of scroll; inside its slice it holds still for
    // `dwell`, then eases into the next item over the remainder. The last item
    // gets the same slice length, so distribution is even end to end.
    const itemTimeline = (p: number) => {
      const raw = clamp(p) * total
      const i = Math.min(total - 1, Math.floor(raw))
      if (i >= total - 1) {
        return total - 1
      }
      const local = raw - i
      const t = local <= dwell ? 0 : (local - dwell) / (1 - dwell)
      return i + smoothstep(0, 1, t)
    }

    let raf = 0
    let scrolling = false
    let isVisible = !('IntersectionObserver' in window)

    // Scroll-scrubbed item choreography: previous item clears upward, next item
    // rises into place, and the final item gets a short hold before release.
    const stageItems = (
      nodes: HTMLElement[],
      itemProgress: number,
      edge0: number,
      edge1: number,
      options: { drift?: number; scale?: number; fadeOnly?: boolean } = {},
    ) => {
      const { drift = 0, scale = 0, fadeOnly = false } = options

      nodes.forEach((node, index) => {
        const delta = index - itemProgress
        const distance = Math.abs(delta)
        const opacity = 1 - smoothstep(edge0, edge1, distance)
        const clamped = Math.min(distance, 1.15)
        const y = delta < 0 ? -clamped * drift : clamped * drift
        const itemScale = 1 - clamped * scale

        node.style.opacity = `${opacity}`
        if (!fadeOnly) {
          node.style.transform = `translate3d(0, ${y}rem, 0) scale(${itemScale})`
        }
        node.style.zIndex = `${Math.round(opacity * 100)}`
      })
    }

    const update = () => {
      const q = (selector: string) => Array.from(section.querySelectorAll<HTMLElement>(selector))
      const cards = q('.build-item')
      const navItems = q('.build-nav-item')

      if (cards.length === 0) {
        return
      }

      const bounds = section.getBoundingClientRect()
      const scrollable = Math.max(1, bounds.height - window.innerHeight)
      const p = clamp(-bounds.top / scrollable)
      const itemProgress = itemTimeline(p)
      const progressDot = section.querySelector<HTMLElement>('.build-progress-dot')

      stageItems(q('.build-media-image'), itemProgress, 0.18, 0.86, {
        drift: 2.8,
        scale: 0.045,
      })
      stageItems(cards, itemProgress, 0.16, 0.82, { drift: 2.15, scale: 0.025 })
      stageItems(q('.build-media-tag'), itemProgress, 0.24, 0.72, { fadeOnly: true })
      stageItems(q('.build-caption'), itemProgress, 0.24, 0.72, { fadeOnly: true })
      stageItems(q('.build-tag'), itemProgress, 0.24, 0.72, { fadeOnly: true })

      const activeIndex = Math.min(total - 1, Math.max(0, Math.round(itemProgress)))
      navItems.forEach((item, index) => {
        item.classList.toggle('is-active', index === activeIndex)
      })

      if (progressDot) {
        const point = getBorderPoint(p)
        progressDot.style.setProperty('--build-dot-x', `${point.x}%`)
        progressDot.style.setProperty('--build-dot-y', `${point.y}%`)
      }
    }

    const queueUpdate = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    const startScrubbing = () => {
      if (scrolling) {
        return
      }
      scrolling = true
      window.addEventListener('scroll', queueUpdate, { passive: true })
      queueUpdate()
    }

    const stopScrubbing = () => {
      scrolling = false
      window.removeEventListener('scroll', queueUpdate)
    }

    const clearInline = () => {
      section
        .querySelectorAll<HTMLElement>(
          '.build-item, .build-media-image, .build-media-tag, .build-caption, .build-tag',
        )
        .forEach((node) => node.removeAttribute('style'))
      section.querySelector<HTMLElement>('.build-progress-dot')?.removeAttribute('style')
      section
        .querySelectorAll<HTMLElement>('.build-nav-item')
        .forEach((item) => item.classList.remove('is-active'))
    }

    const applyMode = () => {
      if (isStatic()) {
        section.classList.add('is-static')
        stopScrubbing()
        clearInline()
      } else if (isVisible) {
        section.classList.remove('is-static')
        startScrubbing()
      } else {
        section.classList.remove('is-static')
        stopScrubbing()
      }
    }

    let observer: IntersectionObserver | null = null

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting
          applyMode()
        },
        { rootMargin: '35% 0px' },
      )
      observer.observe(section)
    }

    applyMode()
    window.addEventListener('resize', applyMode)

    return () => {
      cancelAnimationFrame(raf)
      stopScrubbing()
      observer?.disconnect()
      window.removeEventListener('resize', applyMode)
    }
  }, [itemCount, sectionRef])
}

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1)
}

// Smooth 0..1 ramp between two edges (Hermite).
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

// How far below the frame (as a % of frame height) the dot rides the connector
// line on its final phase. Sized so the dot reaches the connector's end right as
// the pinned stage unpins and the next section scrolls in — no dead scroll. Keep
// in sync with the .build-connector height in App.css.
const CONNECTOR_DROP = 12

// Dot path around the frame: top border (left→right), right border (top→bottom),
// bottom border (right→left), then straight DOWN the connector from the
// bottom-left corner into the next section. The left border is never traversed.
function getBorderPoint(progress: number) {
  const p = clamp(progress)

  // Top border: left → right corner.
  if (p < 0.34) {
    return {
      x: (p / 0.34) * 100,
      y: 0,
    }
  }

  // Right border: top → bottom corner.
  if (p < 0.56) {
    return {
      x: 100,
      y: ((p - 0.34) / 0.22) * 100,
    }
  }

  // Bottom border: right → bottom-left corner.
  if (p < 0.78) {
    return {
      x: 100 - ((p - 0.56) / 0.22) * 100,
      y: 100,
    }
  }

  // Connector: drop straight down out of the bottom-left corner toward the
  // next section, handing the eye off for a smooth transition.
  return {
    x: 0,
    y: 100 + ((p - 0.78) / 0.22) * CONNECTOR_DROP,
  }
}
