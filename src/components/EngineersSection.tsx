import { useEffect, useRef } from 'react'
import { engineerPosts } from '../content/home/engineers'
import postImage1 from '../assets/imageTrail12.jpg'
import postImage2 from '../assets/imageTrail27.jpg'
import postImage3 from '../assets/imageTrail33.jpg'
import postImage4 from '../assets/imageTrail41.jpg'
import postImage5 from '../assets/imageTrail48.jpg'
import postImage6 from '../assets/imageTrail6.jpg'

// Cover image per post (index-aligned with engineerPosts).
const postImages = [postImage1, postImage2, postImage3, postImage4, postImage5, postImage6]

export function EngineersSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isStatic = () => mqReduce.matches || window.innerWidth < 860
    const total = engineerPosts.length
    // Fraction of each post's equal scroll segment where it holds fully visible
    // before morphing to the next. Higher = longer dwell, shorter morph.
    const dwell = 0.5

    // Map raw scroll progress (0..1) to a continuous post index. Each post owns
    // an equal slice (1 / total) of scroll; inside its slice it holds still for
    // `dwell`, then eases into the next over the remainder.
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

    // Scroll-scrubbed item choreography: previous post clears upward, next post
    // rises into place as the user scrolls through the pinned stage.
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
      const cards = q('.eng-item')
      const navItems = q('.eng-nav-item')

      if (cards.length === 0) {
        return
      }

      const bounds = section.getBoundingClientRect()
      const scrollable = Math.max(1, bounds.height - window.innerHeight)
      const p = clamp(-bounds.top / scrollable)
      const itemProgress = itemTimeline(p)
      const progressDot = section.querySelector<HTMLElement>('.eng-progress-dot')

      stageItems(q('.eng-media-image'), itemProgress, 0.18, 0.86, {
        drift: 2.8,
        scale: 0.045,
      })
      stageItems(cards, itemProgress, 0.16, 0.82, { drift: 2.15, scale: 0.025 })

      const activeIndex = Math.min(total - 1, Math.max(0, Math.round(itemProgress)))
      navItems.forEach((item, index) => {
        item.classList.toggle('is-active', index === activeIndex)
      })

      if (progressDot) {
        const point = getBorderPoint(p)
        progressDot.style.setProperty('--eng-dot-x', `${point.x}%`)
        progressDot.style.setProperty('--eng-dot-y', `${point.y}%`)
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
        .querySelectorAll<HTMLElement>('.eng-item, .eng-media-image')
        .forEach((node) => node.removeAttribute('style'))
      section.querySelector<HTMLElement>('.eng-progress-dot')?.removeAttribute('style')
      section
        .querySelectorAll<HTMLElement>('.eng-nav-item')
        .forEach((item) => item.classList.remove('is-active'))
    }

    const applyMode = () => {
      if (isStatic()) {
        section.classList.add('is-static')
        stopScrubbing()
        clearInline()
      } else {
        section.classList.remove('is-static')
        startScrubbing()
      }
    }

    applyMode()
    window.addEventListener('resize', applyMode)

    return () => {
      cancelAnimationFrame(raf)
      stopScrubbing()
      window.removeEventListener('resize', applyMode)
    }
  }, [])

  return (
    <section className="eng-section" id="blog" aria-labelledby="eng-title" ref={sectionRef}>
      <div className="eng-stage">
        <div className="section-shell eng-shell">
          <p className="section-label eng-eyebrow" id="eng-title">
            <span>From our engineers</span>
          </p>

          <div className="eng-frame">
            <span className="eng-connector" aria-hidden="true" />
            <span className="eng-progress-dot" aria-hidden="true" />

            {/* LEFT: post details */}
            <div className="eng-left">
              <div className="eng-copy-panel">
                <div className="eng-track">
                  {engineerPosts.map((post, index) => (
                    <article className="eng-item" data-index={index} key={post.title}>
                      <p className="eng-date">{post.date}</p>
                      <h3>{post.title}</h3>
                      <span>{post.description}</span>
                      <p className="eng-author">
                        {post.author}
                        <span>{post.role}</span>
                      </p>
                      <ul className="eng-tags">
                        {post.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>

              <ul className="eng-nav">
                {engineerPosts.map((post) => (
                  <li className="eng-nav-item" key={post.title}>
                    <span className="eng-nav-index">{post.index}</span>
                    <span className="eng-nav-label">{post.category}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: cover image only */}
            <div className="eng-media-panel">
              <div className="eng-media" aria-hidden="true">
                {engineerPosts.map((post, index) => (
                  <img
                    alt=""
                    className="eng-media-image"
                    draggable="false"
                    key={post.title}
                    loading="lazy"
                    src={postImages[index % postImages.length]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
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
// in sync with the .eng-connector height in App.css.
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
