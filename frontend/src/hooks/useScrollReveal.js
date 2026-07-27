import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, ...options }
    )

    // Observe all reveal elements inside the ref
    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    targets.forEach((t) => observer.observe(t))
    // Also observe the el itself if it has a reveal class
    if (el.classList.contains('reveal') || el.classList.contains('reveal-left') ||
        el.classList.contains('reveal-right') || el.classList.contains('reveal-scale')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}

export function useRevealOnce() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    targets.forEach((t) => observer.observe(t))

    return () => observer.disconnect()
  }, [])
}