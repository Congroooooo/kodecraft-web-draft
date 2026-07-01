import { useEffect, useRef } from 'react'

const imageTrailModules = import.meta.glob('../assets/imageTrail*.jpg', {
  eager: true,
  import: 'default',
  query: '?format=webp&quality=76',
}) as Record<string, string>

const imageTrailSources = Object.entries(imageTrailModules)
  .sort(([a], [b]) => imageNumber(a) - imageNumber(b))
  .map(([, src]) => src)

export function CultureSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const images = Array.from(section.querySelectorAll<HTMLImageElement>('.culture-trail-image'))
    let activeIndex = 0
    let zIndex = 1
    let last = { x: section.clientWidth / 2, y: section.clientHeight / 2 }
    let hasLast = false

    const isStatic = () => reduce.matches || window.innerWidth < 680

    const showImage = (x: number, y: number) => {
      const image = images[activeIndex % images.length]

      if (!image || isStatic()) {
        return
      }

      const rect = image.getBoundingClientRect()
      const width = rect.width || 280
      const height = rect.height || 360
      const from = hasLast ? last : { x, y }
      const travel = Math.hypot(x - from.x, y - from.y)
      // Spacing scales with image width so the trail density feels consistent.
      const spacing = width * 0.36

      if (hasLast && travel < spacing) {
        return
      }

      const left = x - width / 2
      const top = y - height / 2
      const rotation = ((activeIndex % 7) - 3) * 2.2
      image.style.zIndex = `${zIndex}`

      image.getAnimations().forEach((animation) => animation.cancel())
      // Stamp the image where the pointer is, hold, then fade out in place.
      image.animate(
        [
          {
            opacity: 0,
            transform: `translate3d(${left}px, ${top}px, 0) scale(0.78) rotate(${rotation}deg)`,
          },
          {
            opacity: 1,
            offset: 0.18,
            transform: `translate3d(${left}px, ${top}px, 0) scale(1) rotate(${rotation}deg)`,
          },
          {
            opacity: 1,
            offset: 0.72,
            transform: `translate3d(${left}px, ${top}px, 0) scale(1) rotate(${rotation}deg)`,
          },
          {
            opacity: 0,
            transform: `translate3d(${left}px, ${top}px, 0) scale(0.96) rotate(${rotation}deg)`,
          },
        ],
        {
          duration: 1850,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards',
        },
      )

      last = { x, y }
      hasLast = true
      activeIndex += 1
      zIndex += 1
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect()
      showImage(event.clientX - bounds.left, event.clientY - bounds.top)
    }

    const handlePointerEnter = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect()
      last = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
      hasLast = false
    }

    section.addEventListener('pointerenter', handlePointerEnter)
    section.addEventListener('pointermove', handlePointerMove)

    return () => {
      section.removeEventListener('pointerenter', handlePointerEnter)
      section.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return (
    <section className="culture-section" id="culture" aria-labelledby="culture-title" ref={sectionRef}>
      <div className="culture-trail" aria-hidden="true">
        {imageTrailSources.map((src, index) => (
          <img
            alt=""
            className="culture-trail-image"
            draggable="false"
            key={src}
            loading={index < 12 ? 'eager' : 'lazy'}
            src={src}
          />
        ))}
      </div>

      <div className="section-shell culture-shell">
        <p className="section-label culture-label" data-reveal>
          Culture / Why Join / Moments
        </p>

        <p className="culture-hint" data-reveal aria-hidden="true">
          Hover to see moments…
        </p>

        <h2 className="culture-outline" id="culture-title" data-reveal>
          kodecraft
        </h2>

        <p className="culture-description" data-reveal>
          KodeCraft is built by people who care about the work and the life around it. The same team that ships agent-native systems also makes room for workations, tech talks, team building, celebrations, and the ordinary moments that keep good people close.
        </p>
      </div>

      <a className="button button-primary culture-cta" data-reveal href="/events">
        View More Moments
        <span aria-hidden="true">-&gt;</span>
      </a>
    </section>
  )
}

function imageNumber(path: string) {
  return Number(path.match(/imageTrail(\d+)/)?.[1] ?? 0)
}
