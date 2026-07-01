import { useRef } from 'react'
import { heroContent } from '../content/home/hero'
import { useVideoSyncedGlow } from '../hooks/useVideoSyncedGlow'

const heroSectionClasses = [
  'relative min-h-svh overflow-hidden px-kc-gutter pb-12 pt-[8.75rem]',
  '[--hero-glow-alpha:0.18] [--hero-glow-core-height:32rem] [--hero-glow-core-width:42rem]',
  '[--hero-glow-halo-height:42rem] [--hero-glow-halo-width:68rem] [--hero-glow-x:52%] [--hero-glow-y:43%]',
  'max-[1024px]:flex max-[1024px]:min-h-[860px] max-[1024px]:flex-col max-[1024px]:justify-center',
  'max-[680px]:min-h-[760px] max-[680px]:pt-[7.5rem]',
].join(' ')

const heroScrimClasses = [
  'absolute inset-0 z-[1] h-full w-full',
  'bg-[radial-gradient(ellipse_var(--hero-glow-core-width)_var(--hero-glow-core-height)_at_var(--hero-glow-x)_var(--hero-glow-y),rgba(74,222,128,var(--hero-glow-alpha)),rgba(16,185,129,0.08)_34%,rgba(7,11,20,0)_68%),radial-gradient(ellipse_var(--hero-glow-halo-width)_var(--hero-glow-halo-height)_at_var(--hero-glow-x)_var(--hero-glow-y),rgba(74,222,128,0.08),rgba(7,11,20,0)_72%),linear-gradient(90deg,rgba(7,11,20,0.96)_0%,rgba(7,11,20,0.7)_26%,rgba(7,11,20,0.38)_50%,rgba(7,11,20,0.7)_74%,rgba(7,11,20,0.96)_100%),linear-gradient(180deg,rgba(7,11,20,0.24),#070b14_96%)]',
].join(' ')

const heroButtonClasses = [
  'group relative inline-flex min-h-[3.35rem] items-center gap-3 overflow-hidden rounded-none font-kc-heading text-[0.8rem] font-bold uppercase tracking-[0.08em]',
  'bg-kc-brand px-[1.45rem] text-[#07100b]',
  'before:pointer-events-none before:absolute before:inset-0 before:-translate-x-[120%] before:bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] before:content-[\'\'] before:transition-transform before:duration-700 before:ease-kc-out',
  'hover:before:translate-x-[120%] focus-visible:before:translate-x-[120%]',
  'max-[680px]:w-full max-[680px]:justify-center',
].join(' ')

const heroSecondaryButtonClasses = [
  'relative inline-flex min-h-auto items-center gap-3 rounded-none font-kc-heading text-[0.8rem] font-bold uppercase tracking-[0.08em] text-kc-text',
  'after:absolute after:inset-x-0 after:-bottom-[0.45rem] after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-[420ms] after:ease-kc-out after:content-[\'\']',
  'hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100',
  'max-[680px]:w-auto max-[680px]:justify-center',
].join(' ')

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useVideoSyncedGlow(videoRef, sectionRef)

  return (
    <section className={heroSectionClasses} aria-labelledby="hero-title" ref={sectionRef}>
      <video
        className="absolute inset-0 z-0 h-full w-full scale-[1.02] object-cover object-[60%_center] brightness-[0.76] contrast-[1.08] saturate-[0.72]"
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

      <div className={heroScrimClasses} aria-hidden="true" />

      <div className="absolute left-kc-gutter top-[43%] z-[2] max-w-[min(38rem,52vw)] -translate-y-1/2 max-[1024px]:relative max-[1024px]:left-auto max-[1024px]:top-auto max-[1024px]:max-w-full max-[1024px]:translate-y-0">
        <h1
          className="max-w-[10.8em] text-[clamp(2.75rem,3vw,4.25rem)] leading-[1.08] tracking-[-0.03em] max-[680px]:text-[clamp(2.85rem,15vw,5.25rem)]"
          id="hero-title"
          data-reveal
        >
          {heroContent.headlineLines.map((line) => (
            <span className="block whitespace-nowrap max-[680px]:whitespace-normal" key={line}>
              {line}
            </span>
          ))}
        </h1>
      </div>

      <div className="absolute bottom-[4.5rem] left-kc-gutter right-kc-gutter z-[2] grid items-start justify-between gap-[clamp(2rem,8vw,8rem)] [grid-template-columns:minmax(0,36rem)_minmax(20rem,26rem)] max-[1024px]:relative max-[1024px]:bottom-auto max-[1024px]:left-auto max-[1024px]:right-auto max-[1024px]:mt-8 max-[1024px]:w-full max-[1024px]:grid-cols-1">
        <div className="max-w-[36rem]">
          <p
            className="max-w-[36rem] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.65] text-kc-muted max-[680px]:mt-[1.45rem]"
            data-reveal
          >
            {heroContent.description}
          </p>
          <div className="mt-[2.2rem] flex flex-wrap items-center gap-4 max-[680px]:mt-[1.55rem] max-[680px]:flex-col max-[680px]:items-stretch">
            <a className={heroButtonClasses} href="#roles">
              See Open Roles
              <span className="transition-transform duration-300 ease-kc-out group-hover:translate-x-[0.28rem]" aria-hidden="true">
                -&gt;
              </span>
            </a>
            <a className={heroSecondaryButtonClasses} href="#work">
              Explore the Work
            </a>
          </div>
        </div>

        <aside
          className="grid w-[26vw] max-w-[26rem] gap-[0.55rem] self-end border-t border-[rgba(240,245,255,0.78)] pt-[1.2rem] text-kc-text max-[680px]:mt-7 max-[680px]:w-full"
          aria-label="KodeCraft focus"
        >
          <span className="text-[0.78rem] uppercase tracking-[0.12em] text-[rgba(240,245,255,0.56)]">
            {heroContent.proofLabel}
          </span>
          <strong className="font-kc-heading text-[clamp(1rem,1.4vw,1.35rem)]">{heroContent.proofText}</strong>
        </aside>
      </div>
    </section>
  )
}
