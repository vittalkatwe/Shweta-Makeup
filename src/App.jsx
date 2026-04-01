import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import clevertap from './hooks/clevertap'
import { trackEvent, trackCustomEvent } from './hooks/meta'
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
import Refund from './pages/Redund.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfUse from './pages/TermsOfUse.jsx'

function HomePage() {
  const [coursePrice, setCoursePrice] = useState('499')
  const eventFiredRef = useRef(false)
  const firedSectionsRef = useRef(new Set())

  useEffect(() => {
    fetchAndActivate(remoteConfig)
      .then(() => {
        const price = getValue(remoteConfig, 'course_price').asString()
        setCoursePrice(price)

        if (!eventFiredRef.current) {
          eventFiredRef.current = true
          clevertap.event.push('homepage_shown', {
            pricing_variant: `pricing_${price}`,
          })
          trackEvent('PageView', { pricing_variant: `pricing_${price}` })
        }
      })
      .catch(() => {})
  }, [])

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
      { threshold: 0.08 }
    )
    const observe = () => {
      document
        .querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
        .forEach((el) => observer.observe(el))
    }
    observe()
    const timer = setTimeout(observe, 300)

    const firedSections = firedSectionsRef.current
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.getAttribute('data-section')
          if (entry.isIntersecting && section && !firedSections.has(section)) {
            firedSections.add(section)
            clevertap.event.push('homepage_scroll', { section })
            trackCustomEvent('homepage_scroll', { section })
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
      observer.disconnect()
      scrollObserver.disconnect()
      clearTimeout(timer)
      clearTimeout(scrollTimer)
    }
  }, [])

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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  )
}

// Scrolls to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}