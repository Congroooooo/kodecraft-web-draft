import { useEffect, useRef } from 'react'
import firstCardImage from '../assets/1stcard.png'
import secondCardImage from '../assets/2ndcard.png'
import thirdCardImage from '../assets/3rdcard.png'
import { first90DaysItems } from '../content/home/first90Days'

// Position of each copy block on screen, by step index.
const COPY_POSITION = ['pos-left', 'pos-right', 'pos-center'] as const

const CARD_IMAGES = [firstCardImage, secondCardImage, thirdCardImage]

// Hero media frame keyframes. Each value is an inset rect in % of the stage:
// the frame travels small-centered -> right panel -> left panel -> full bleed.
type Rect = { top: number; right: number; bottom: number; left: number }

const HERO_KEYFRAMES: { at: number; rect: Rect }[] = [
  { at: 0.0, rect: { top: 30, right: 37, bottom: 30, left: 37 } }, // small, centered
  { at: 0.16, rect: { top: 16, right: 6, bottom: 16, left: 50 } }, // docked right (step 1)
  { at: 0.34, rect: { top: 16, right: 6, bottom: 16, left: 50 } }, // hold to read
  { at: 0.42, rect: { top: 16, right: 50, bottom: 16, left: 6 } }, // docked left (step 2), mirrors step 1
  { at: 0.6, rect: { top: 16, right: 50, bottom: 16, left: 6 } }, // hold to read
  { at: 0.74, rect: { top: 6, right: 6, bottom: 6, left: 6 } }, // expanding
  { at: 0.86, rect: { top: 0, right: 0, bottom: 0, left: 0 } }, // full bleed (step 3)
  { at: 1.0, rect: { top: 0, right: 0, bottom: 0, left: 0 } },
]

export function First90DaysSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animationFrame = 0
    let scrolling = false

    const isStatic = () => mqReduce.matches || window.innerWidth < 860

    const update = () => {
      const hero = section.querySelector<HTMLElement>('.first90-hero')
      const layers = Array.from(section.querySelectorAll<HTMLElement>('.first90-hero-layer'))
      const scrim = section.querySelector<HTMLElement>('.first90-hero-scrim')
      const blocks = Array.from(section.querySelectorAll<HTMLElement>('.first90-copy-block'))

      if (!hero) {
        return
      }

      const bounds = section.getBoundingClientRect()
      const scrollableDistance = Math.max(1, bounds.height - window.innerHeight)
      const p = clamp(-bounds.top / scrollableDistance)

      // Hero frame position / size.
      const rect = rectAt(p)
      hero.style.top = `${rect.top}%`
      hero.style.right = `${rect.right}%`
      hero.style.bottom = `${rect.bottom}%`
      hero.style.left = `${rect.left}%`
      // Square corners as it reaches full bleed.
      hero.style.borderRadius = `${lerp(20, 0, smoothstep(0.74, 0.86, p))}px`

      // Footage / placeholder crossfade inside the frame.
      const layerOpacity = [
        1 - smoothstep(0.04, 0.12, p),
        smoothstep(0.08, 0.15, p) * (1 - smoothstep(0.34, 0.4, p)),
        smoothstep(0.34, 0.4, p) * (1 - smoothstep(0.62, 0.68, p)),
        smoothstep(0.62, 0.68, p),
      ]
      layers.forEach((layer, index) => {
        layer.style.opacity = `${layerOpacity[index] ?? 0}`
      })

      // Dark scrim behind the closing caption.
      if (scrim) {
        scrim.style.opacity = `${smoothstep(0.74, 0.9, p) * 0.72}`
      }

      // Copy blocks: timed reveal windows.
      const copyOpacity = [
        smoothstep(0.13, 0.19, p) * (1 - smoothstep(0.3, 0.36, p)),
        smoothstep(0.4, 0.46, p) * (1 - smoothstep(0.6, 0.66, p)),
        smoothstep(0.8, 0.88, p),
      ]
      blocks.forEach((block, index) => {
        const opacity = copyOpacity[index] ?? 0
        block.style.opacity = `${opacity}`
        block.style.transform = `translateY(${lerp(22, 0, opacity)}px)`
        block.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none'
      })
    }

    const queueUpdate = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(update)
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

    const applyMode = () => {
      if (isStatic()) {
        section.classList.add('is-static')
        stopScrubbing()
        resetInlineStyles(section)
      } else {
        section.classList.remove('is-static')
        startScrubbing()
      }
    }

    applyMode()
    window.addEventListener('resize', () => {
      applyMode()
      if (scrolling) {
        queueUpdate()
      }
    })

    return () => {
      cancelAnimationFrame(animationFrame)
      stopScrubbing()
      window.removeEventListener('resize', applyMode)
    }
  }, [])

  return (
    <section className="first90-section" id="first-90-days" aria-labelledby="first90-title" ref={sectionRef}>
      <div className="first90-stage">
        <div className="first90-static-intro">
          <p className="section-label">Your first 90 days</p>
          <h2>A ramp built for people who want real ownership.</h2>
        </div>

        <div className="first90-hero" aria-hidden="true">
          <div className="first90-hero-layer first90-hero-intro">
            <div className="first90-intro-card">
              <p className="section-label">Your first 90 days</p>
              <h2 id="first90-title">
                A ramp built for
                <br />
                people who want
                <br />
                real ownership.
              </h2>
            </div>
          </div>

          {first90DaysItems.map((item, index) => (
            <div
              className="first90-hero-layer"
              key={item.eyebrow}
              style={{ opacity: 0 }}
            >
              <img alt="" className="first90-asset" draggable="false" src={CARD_IMAGES[index]} />
            </div>
          ))}
          <div className="first90-hero-scrim" />
        </div>

        {first90DaysItems.map((item, index) => (
          <div
            className={`first90-copy-block ${COPY_POSITION[index] ?? 'pos-center'}`}
            data-index={index}
            key={item.title}
          >
            <div className="first90-copy">
              <p>{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <span>{item.text}</span>
              {index === 1 ? <a href="#blog">Read the blog</a> : null}
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1)
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t
}

// Smooth 0..1 ramp between two edges (Hermite), for eased reveals.
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

// Interpolate the hero rect for a given global progress, easing each segment.
function rectAt(p: number): Rect {
  const frames = HERO_KEYFRAMES

  if (p <= frames[0].at) {
    return frames[0].rect
  }

  const last = frames[frames.length - 1]

  if (p >= last.at) {
    return last.rect
  }

  for (let index = 0; index < frames.length - 1; index += 1) {
    const a = frames[index]
    const b = frames[index + 1]

    if (p >= a.at && p <= b.at) {
      const t = smoothstep(a.at, b.at, p)

      return {
        top: lerp(a.rect.top, b.rect.top, t),
        right: lerp(a.rect.right, b.rect.right, t),
        bottom: lerp(a.rect.bottom, b.rect.bottom, t),
        left: lerp(a.rect.left, b.rect.left, t),
      }
    }
  }

  return last.rect
}

// Clear JS-driven inline styles so the static (reduced-motion / mobile) layout
// is fully controlled by CSS.
function resetInlineStyles(section: HTMLElement) {
  const targets = section.querySelectorAll<HTMLElement>(
    '.first90-hero, .first90-hero-layer, .first90-hero-scrim, .first90-copy-block',
  )
  targets.forEach((node) => {
    node.removeAttribute('style')
  })
}
