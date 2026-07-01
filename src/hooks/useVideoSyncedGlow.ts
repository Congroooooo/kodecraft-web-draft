import { type RefObject, useEffect } from 'react'

type GlowState = {
  alpha: number
  coreHeight: number
  coreWidth: number
  haloHeight: number
  haloWidth: number
  x: number
  y: number
}

const neuralNetworkGlow: GlowState = {
  alpha: 0.18,
  coreHeight: 32,
  coreWidth: 42,
  haloHeight: 42,
  haloWidth: 68,
  x: 52,
  y: 43,
}

const walkingSilhouetteGlow: GlowState = {
  alpha: 0.16,
  coreHeight: 46,
  coreWidth: 28,
  haloHeight: 58,
  haloWidth: 48,
  x: 51,
  y: 49,
}

export function useVideoSyncedGlow(
  videoRef: RefObject<HTMLVideoElement | null>,
  containerRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current

    if (!video || !container) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      applyGlowState(container, neuralNetworkGlow)
      return
    }

    let animationFrame = 0

    const syncGlowToVideo = () => {
      const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 15.042
      const progress = (video.currentTime % duration) / duration
      const glowState = getGlowStateForProgress(progress)

      applyGlowState(container, glowState)
      animationFrame = window.requestAnimationFrame(syncGlowToVideo)
    }

    const startSync = () => {
      if (animationFrame) {
        return
      }

      void video.play().catch(() => undefined)
      animationFrame = window.requestAnimationFrame(syncGlowToVideo)
    }

    const stopSync = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = 0
      }

      video.pause()
    }

    if (!('IntersectionObserver' in window)) {
      startSync()

      return stopSync
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startSync()
        } else {
          stopSync()
        }
      },
      { threshold: 0.08 },
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      stopSync()
    }
  }, [containerRef, videoRef])
}

function getGlowStateForProgress(progress: number) {
  if (progress < 0.36) {
    return walkingSilhouetteGlow
  }

  if (progress < 0.58) {
    return interpolateGlowState(
      walkingSilhouetteGlow,
      neuralNetworkGlow,
      easeInOut((progress - 0.36) / 0.22),
    )
  }

  if (progress < 0.86) {
    return neuralNetworkGlow
  }

  return interpolateGlowState(
    neuralNetworkGlow,
    walkingSilhouetteGlow,
    easeInOut((progress - 0.86) / 0.14),
  )
}

function interpolateGlowState(from: GlowState, to: GlowState, amount: number): GlowState {
  return {
    alpha: interpolate(from.alpha, to.alpha, amount),
    coreHeight: interpolate(from.coreHeight, to.coreHeight, amount),
    coreWidth: interpolate(from.coreWidth, to.coreWidth, amount),
    haloHeight: interpolate(from.haloHeight, to.haloHeight, amount),
    haloWidth: interpolate(from.haloWidth, to.haloWidth, amount),
    x: interpolate(from.x, to.x, amount),
    y: interpolate(from.y, to.y, amount),
  }
}

function applyGlowState(container: HTMLElement, state: GlowState) {
  container.style.setProperty('--hero-glow-alpha', state.alpha.toFixed(3))
  container.style.setProperty('--hero-glow-core-height', `${state.coreHeight.toFixed(2)}rem`)
  container.style.setProperty('--hero-glow-core-width', `${state.coreWidth.toFixed(2)}rem`)
  container.style.setProperty('--hero-glow-halo-height', `${state.haloHeight.toFixed(2)}rem`)
  container.style.setProperty('--hero-glow-halo-width', `${state.haloWidth.toFixed(2)}rem`)
  container.style.setProperty('--hero-glow-x', `${state.x.toFixed(2)}%`)
  container.style.setProperty('--hero-glow-y', `${state.y.toFixed(2)}%`)
}

function interpolate(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

function easeInOut(amount: number) {
  const clampedAmount = Math.min(Math.max(amount, 0), 1)

  return clampedAmount * clampedAmount * (3 - 2 * clampedAmount)
}
