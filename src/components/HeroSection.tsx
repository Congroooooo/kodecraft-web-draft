import { useRef } from 'react'
import { heroContent } from '../content/siteContent'
import { useVideoSyncedGlow } from '../hooks/useVideoSyncedGlow'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useVideoSyncedGlow(videoRef, sectionRef)

  return (
    <section className="hero-section" aria-labelledby="hero-title" ref={sectionRef}>
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        poster="/favicon.svg"
        ref={videoRef}
      >
        <source src="/media/data-flow.webm" type="video/webm" />
      </video>

      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-content">
        <h1 id="hero-title" data-reveal>
          {heroContent.headlineLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
      </div>

      <div className="hero-support">
        <div className="hero-support-content">
          <p className="hero-copy" data-reveal>
            {heroContent.description}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#roles">
              See Open Roles
              <span aria-hidden="true">-&gt;</span>
            </a>
            <a className="button button-secondary" href="#work">
              Explore the Work
            </a>
          </div>
        </div>

        <aside className="hero-proof" aria-label="KodeCraft focus">
          <span>{heroContent.proofLabel}</span>
          <strong>{heroContent.proofText}</strong>
        </aside>
      </div>
    </section>
  )
}
