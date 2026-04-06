import React, { useEffect, useRef, useState } from 'react'
import { usePrice } from '../hooks/usePrice'

const CHECKOUT_URL = '/payment'

const NOTIFICATIONS = [
  { name: 'Naina', city: 'Jodhpur' },
  { name: 'Vaishali', city: 'Nashik' },
  { name: 'Muskan', city: 'Indore' },
  { name: 'Tripti', city: 'Patna' },
  { name: 'Ishika', city: 'Indore' },
  { name: 'Vivek', city: 'Rajkot' },
  { name: 'Satvika', city: 'Kolkota' },
  { name: 'Manju Devi', city: 'Ranchi' },
  { name: 'Prabhavati', city: 'Mysore' },
]

function SocialProofTicker() {
  const [active, setActive] = useState(null)
  const [exiting, setExiting] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef(null)

  const showNext = () => {
    const notif = NOTIFICATIONS[indexRef.current % NOTIFICATIONS.length]
    indexRef.current += 1
    setExiting(false)
    setActive({ ...notif, id: Date.now() })
    timerRef.current = setTimeout(() => {
      setExiting(true)
      setTimeout(() => { showNext() }, 420)
    }, 2600)
  }

  useEffect(() => {
    const initial = setTimeout(showNext, 600)
    return () => { clearTimeout(initial); clearTimeout(timerRef.current) }
  }, [])

  if (!active) return <div style={{ height: '38px' }} />

  return (
    <div className="ticker-wrapper">
      <div
        className="social-proof-ticker"
        style={{
          animation: exiting
            ? 'tickerExit 0.4s cubic-bezier(0.4,0,1,1) forwards'
            : 'tickerEnter 0.45s cubic-bezier(0.16,1,0.3,1) forwards',
        }}
      >
        <span className="ticker-bolt">⚡</span>
        <span className="ticker-text">
          <strong><b>{active.name}</b></strong>
          <span className="ticker-sep"> from </span>
          <strong>{active.city}</strong>
          <span className="ticker-action"> just joined the course</span>
        </span>
      </div>
    </div>
  )
}

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: -(Math.random() * 0.5 + 0.2),
        alpha: Math.random() * 0.5 + 0.15,
        color: Math.random() > 0.5 ? '232,146,124' : '201,169,110',
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        p.alpha -= 0.0008
        if (p.y < -10 || p.alpha <= 0) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height + 10
          p.alpha = Math.random() * 0.5 + 0.15
        }
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
      </svg>
    ),
    text: 'Date: 8, 9 & 10 April (Live & recorded)',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
      </svg>
    ),
    text: 'Timings: 12 PM to 4 PM',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
      </svg>
    ),
    text: 'Learn 15 Trending Hairstyles',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z" />
      </svg>
    ),
    text: 'Get Full Class Video Recording',
  },
]

export default function HeroSection() {
  const { coursePrice: courseAmount, urgencyTest } = usePrice()

  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  // Autoplay on mount
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {})
  }, [])

  // Pause when scrolled out, resume when scrolled back in
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  return (
    <>
      <style>{`
        @keyframes tickerEnter {
          0%   { opacity: 0; transform: translateY(12px) scale(0.94); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0px) scale(1); filter: blur(0px); }
        }
        @keyframes tickerExit {
          0%   { opacity: 1; transform: translateY(0px) scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: translateY(-12px) scale(0.94); filter: blur(4px); }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.6); opacity: 0.6; }
        }
        @keyframes ringPulse {
          0%   { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes shimmer {
          0%   { background-position: -250% center; }
          100% { background-position: 250% center; }
        }

        .ticker-wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
          min-height: 40px;
          margin-top: -55px;
          margin-bottom: 20px;
        }

        .social-proof-ticker {
          display: inline-flex;
          align-items: center;
          background: #fffdf5;
          border: 1px solid rgba(255, 200, 130, 0.42);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 999px;
          height: 32px;
          padding: 0px 22px 0px 14px;
          font-size: 0.70rem;
          font-weight: 500;
          letter-spacing: 0.015em;
          color: #2d1f18;
          box-shadow:
            0 0 0 1px rgba(255, 200, 100, 0.12),
            0 4px 28px rgba(220, 130, 60, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
          position: relative;
          overflow: hidden;
          max-width: 100%;
          white-space: nowrap;
        }

        .social-proof-ticker::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 25%,
            rgba(255, 230, 160, 0.15) 45%,
            rgba(255, 255, 220, 0.20) 50%,
            rgba(255, 230, 160, 0.15) 55%,
            transparent 75%
          );
          background-size: 250% 100%;
          animation: shimmer 2.8s linear infinite;
          border-radius: inherit;
          pointer-events: none;
        }

        .social-proof-ticker::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 15%;
          right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 200, 120, 0.5), transparent);
          border-radius: 999px;
        }

        .ticker-bolt {
          font-size: 0.88rem;
          flex-shrink: 0;
          filter: drop-shadow(0 0 5px rgba(255, 220, 80, 0.9));
        }

        .ticker-text {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .ticker-text strong {
          color: #c0614a;
          font-weight: 800;
          text-shadow: 0 1px 10px rgba(255, 200, 120, 0.5);
        }

        .ticker-sep {
          color: #7a5c52;
          font-weight: 400;
          margin: 0 1px;
        }

        .ticker-action {
          color: #7a5c52;
          font-weight: 400;
        }

        .video-container {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
        }

        .hero-video {
          width: 100%;
          border-radius: 16px;
          display: block;
          pointer-events: none;
        }

        .sound-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.50);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 999px;
          padding: 6px 12px 6px 9px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-weight: 700;
          color: #fff;
          pointer-events: none;
          user-select: none;
          letter-spacing: 0.04em;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .sound-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          background: #f87171;
          animation: pulseDot 1.4s ease-in-out infinite;
        }

        .sound-overlay.unmuted .sound-dot {
          background: #4ade80;
          animation: none;
        }
      `}</style>

      <section className="hero-section" data-section="hero">
        <div className="hero-inner">

          <SocialProofTicker />

          <h1 className="hero-title">
            Makeup Achha Hai, <br />
            <em> Par Hairstyling Weak?</em><br />
            Stop Losing Time & Clients
          </h1>

          <div ref={containerRef} className="video-container" onClick={toggleMute}>
            <video
              ref={videoRef}
              src="https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/hero-section%20videos/0325(1).mp4"
              autoPlay
              muted
              loop
              poster='https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/certificate-shweta-makeover.jpeg'
              playsInline
              preload="auto"
              className="hero-video"
            />

            <div className={`sound-overlay ${!isMuted ? 'unmuted' : ''}`}>
              <span className="sound-dot" />
              <span>{isMuted ? '🔇 Tap for sound' : '🔊 Sound on'}</span>
            </div>
          </div>

          <div className="hero-features">
            {features.map(({ icon, text }, i) => (
              <div className="hero-feature-item" key={text} style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                {icon}
                <span>{text}</span>
              </div>
            ))}
          </div>

          {urgencyTest ? (
            <div className="cta-with-urgency" style={{ animation: 'fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.9s both' }}>
              <a href={CHECKOUT_URL} className="cta-button cta-pulse">
                🚀 Join Now for <strong>₹{courseAmount}</strong> <span className="original">₹499</span>
              </a>
              <div className="seats-remaining">
                <span className="seats-dot" /> Only <strong>2 seats</strong> remaining
              </div>
            </div>
          ) : (
            <a href={CHECKOUT_URL} className="cta-button" style={{ animation: 'fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.9s both' }}>
              🚀 Join Now for <strong>₹{courseAmount}</strong>
            </a>
          )}

        </div>
      </section>
    </>
  )
}