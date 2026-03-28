import React, { useEffect, useRef, useState } from 'react'
import clevertap from './hooks/clevertap'
import { remoteConfig, fetchAndActivate, getValue } from './hooks/firebase'
import AnnouncementBar from './components/AnnouncementBar'
import HeroSection from './components/HeroSection'
import BrandsSection from './components/BrandsSection'
import PerfectForYou from './components/PerfectForYou'
import WhoShouldJoin from './components/WhoShouldJoin'
import Curriculum from './components/Curriculum'
import Certificate from './components/Certificate'
import AboutMentor from './components/AboutMentor'
import Testimonials from './components/Testimonials'
import Bonuses from './components/Bonuses'
import FAQ from './components/FAQ'
import StickyBar from './components/StickyBar'
import PaymentPage from './pages/PaymentPage.jsx'

function getShouldShowPayment() {
  const params = new URLSearchParams(window.location.search)
  return params.get('payment') === '1'
}

export default function App() {
  const [showPayment, setShowPayment] = useState(() => getShouldShowPayment())
  const [coursePrice, setCoursePrice] = useState('499')

  useEffect(() => {
    fetchAndActivate(remoteConfig)
      .then(() => {
        const price = getValue(remoteConfig, 'course_price').asString()
        setCoursePrice(price)
        if (!getShouldShowPayment()) {
          clevertap.event.push('homepage_shown', {
            pricing_variant: `pricing_${price}`,
          })
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const onPopState = () => setShowPayment(getShouldShowPayment())
    window.addEventListener('popstate', onPopState)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    const observe = () => {
      document
        .querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
        .forEach((el) => observer.observe(el))
    }
    observe()
    const timer = setTimeout(observe, 300)

    const firedSections = new Set()
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.getAttribute('data-section')
          if (entry.isIntersecting && section && !firedSections.has(section)) {
            firedSections.add(section)
            clevertap.event.push('homepage_scroll', { section })
            scrollObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('[data-section]').forEach((el) => scrollObserver.observe(el))
    const scrollTimer = setTimeout(() => {
      document.querySelectorAll('[data-section]').forEach((el) => {
        if (!firedSections.has(el.getAttribute('data-section'))) {
          scrollObserver.observe(el)
        }
      })
    }, 300)

    return () => {
      window.removeEventListener('popstate', onPopState)
      observer.disconnect()
      scrollObserver.disconnect()
      clearTimeout(timer)
      clearTimeout(scrollTimer)
    }
  }, [showPayment])

  const handleBackToHome = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('payment')
    window.history.pushState({}, '', url.pathname + url.search + url.hash)
    setShowPayment(false)
  }

  if (showPayment) {
    return <PaymentPage onBackToHome={handleBackToHome} />
  }

  return (
    <>
      <AnnouncementBar />
      <HeroSection />
      <PerfectForYou />
      <Testimonials />
      <Curriculum />
      <Certificate />
      <AboutMentor />
      <Bonuses />
      <FAQ />
      <StickyBar />
    </>
  )
}