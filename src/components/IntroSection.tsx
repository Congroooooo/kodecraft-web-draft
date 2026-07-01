import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const introStatement =
  'This is not a body shop. We build products, platforms, and agent-native systems where engineers shape what gets built, how it is architected, and why it matters.'

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])
  const introWords = splitIntoWords(introStatement)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const words = wordsRef.current

    if (!section || !text || words.length === 0) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(words, { color: 'rgb(240, 245, 255)' })
      return
    }

    const context = gsap.context(() => {
      const updateTextProgress = (progress: number) => {
        words.forEach((word, index) => {
          gsap.set(word, {
            color: getWordColor(index, words.length, progress),
          })
        })
      }

      updateTextProgress(0)

      // Highlight tracks the text as it scrolls through the viewport — no pin,
      // so the user never feels stuck. scrub keeps it glued to scroll position.
      ScrollTrigger.create({
        trigger: text,
        start: 'top 82%',
        end: 'bottom 38%',
        scrub: 0.4,
        onRefresh: (trigger) => updateTextProgress(trigger.progress),
        onUpdate: (trigger) => updateTextProgress(trigger.progress),
      })
    }, section)

    return () => context.revert()
  }, [])

  wordsRef.current = []

  return (
    <section
      className="relative min-h-svh overflow-clip bg-[#070b14] before:pointer-events-none before:absolute before:inset-0 before:z-0 before:block before:bg-[linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(148,163,184,0.05)_1px,transparent_1px),#070b14] before:bg-[length:25vw_100%,100%_10rem] before:content-['']"
      aria-labelledby="intro-title"
      ref={sectionRef}
    >
      <div className="relative z-[1] mx-auto grid min-h-svh w-[calc(100%-(var(--page-gutter)*2))] max-w-[var(--container)] content-center pb-[clamp(5rem,9vw,9rem)] pt-[clamp(7rem,12vw,12rem)]">
        <p className="section-label mb-[clamp(1.4rem,2.5vw,2.5rem)]">Not a body shop</p>
        <h2
          className="max-w-[17em] text-[clamp(2.1rem,3.9vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-[rgba(148,163,184,0.26)] max-[680px]:text-[clamp(2.35rem,11vw,4rem)] max-[680px]:leading-[1.02] max-[680px]:tracking-[-0.055em]"
          id="intro-title"
          aria-label={introStatement}
          ref={textRef}
        >
          {introWords.map((word, index) => (
            <span
              aria-hidden="true"
              className="inline text-[rgba(148,163,184,0.26)] will-change-[color]"
              key={`${word}-${index}`}
              ref={(element) => {
                if (element) {
                  wordsRef.current.push(element)
                }
              }}
            >
              {word}
              {index < introWords.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}

function splitIntoWords(text: string) {
  return text.split(' ')
}

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1)
}

function interpolateColorChannel(from: number, to: number, amount: number) {
  return Math.round(from + (to - from) * amount)
}

function interpolateNumber(from: number, to: number, amount: number) {
  return Number((from + (to - from) * amount).toFixed(3))
}

function getWordColor(index: number, wordCount: number, progress: number) {
  const wordStart = (index / wordCount) * 0.82
  const wordProgress = clamp((progress - wordStart) / 0.18)
  const red = interpolateColorChannel(148, 240, wordProgress)
  const green = interpolateColorChannel(163, 245, wordProgress)
  const blue = interpolateColorChannel(184, 255, wordProgress)
  const alpha = interpolateNumber(0.26, 1, wordProgress)

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}
