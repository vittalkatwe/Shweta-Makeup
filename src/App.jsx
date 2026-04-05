import React, { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Loader } from 'lucide-react'
import clevertap from './hooks/clevertap'
import { trackEvent, trackCustomEvent } from './hooks/meta'
import { PriceProvider, usePrice } from './hooks/usePrice'
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
  const { coursePrice, urgencyVariant } = usePrice()
  const eventFiredRef = useRef(false)
  const firedSectionsRef = useRef(new Set())

  useEffect(() => {
    if (eventFiredRef.current) return
    eventFiredRef.current = true
    clevertap.event.push('homepage_shown', {
      pricing_variant: `pricing_${coursePrice}`,
      urgency_variant: urgencyVariant,
    })
    trackEvent('PageView', { pricing_variant: `pricing_${coursePrice}` })
  }, [coursePrice])

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
            clevertap.event.push('homepage_scroll', { section, urgency_variant: urgencyVariant })
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

function AppGate() {
  const { ready } = usePrice()
  if (!ready) {
    return (
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f6f2ec',
        }}
      >
        <Loader
          size={32}
          style={{ color: '#b8912a', animation: 'spin 1s linear infinite' }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/terms" element={<TermsOfUse />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PriceProvider>
        <AppGate />
      </PriceProvider>
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