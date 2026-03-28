import React, { useState, useEffect, useRef } from 'react'
import { remoteConfig, fetchAndActivate, getValue } from '../hooks/firebase';

const CHECKOUT_URL = '/?payment=1'

const testimonials = [
  { title: 'TM 1', src: 'https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/testimonials/tanishqa-testimonial.mp4' },
  { title: 'TM 2', src: 'https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/testimonials/vinanti-testimonial.mp4' },
]

function VideoCard({ src, onPlay, onPauseOrEnd }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  // Autoplay muted on mount
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {})
  }, [])

  // Pause when scrolled out, resume when scrolled back in
  useEffect(() => {
    const video = videoRef.current
    const card = cardRef.current
    if (!video || !card) return

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

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
    if (!video.muted) onPlay?.()
    else onPauseOrEnd?.()
  }

  return (
    <div ref={cardRef} className="tm-video-card" onClick={toggleMute}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ pointerEvents: 'none' }}
      />

      <div className={`sound-overlay ${!isMuted ? 'unmuted' : ''}`}>
        <span className="sound-dot" />
        <span>{isMuted ? '🔇 Tap for sound' : '🔊 Sound on'}</span>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef(null)

  const [courseAmount, setCourseAmount] = useState(5000);
  const [originalAmount, setOriginalAmount] = useState(5000);
  const [pricingVariant, setPricingVariant] = useState("default");

  useEffect(() => {
    async function loadConfig() {
      try {
        await fetchAndActivate(remoteConfig);
        const price = getValue(remoteConfig, "course_price").asString();
        const original = getValue(remoteConfig, "original_price").asString();
        const variant = getValue(remoteConfig, "pricing_variant").asString();
        setCourseAmount(Number(price) || 499);
        setOriginalAmount(Number(original) || 999);
        setPricingVariant(variant || "default");
      } catch (err) {
        console.error("Remote config error:", err);
        setCourseAmount(499);
        setOriginalAmount(999);
        setPricingVariant("default");
      }
    }
    loadConfig();
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length)
        setFading(false)
        setIsPlaying(false)
      }, 300)
    }, 4500)
  }

  const stopTimer = () => clearInterval(timerRef.current)

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const goTo = (i) => {
    if (i === current || isPlaying) return
    setFading(true)
    setTimeout(() => {
      setCurrent(i)
      setFading(false)
    }, 300)
  }

  return (
    <>
      <style>{`
        .tm-video-card {
          position: relative;
          width: 80%;
          max-width: 340px;
          margin: 0 auto;
          aspect-ratio: 9 / 16;
          border-radius: 20px;
          overflow: hidden;
          background: #0a0a0a;
          cursor: pointer;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.07),
            0 8px 40px rgba(0,0,0,0.55),
            0 2px 8px rgba(0,0,0,0.3);
        }

        .tm-video-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
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

        .slider-nav {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
        }

        .slider-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #a4a4a4;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: width 0.3s ease, background 0.3s ease;
        }

        .slider-dot.active {
          width: 24px;
          background: linear-gradient(90deg, #e8927c, #c9a96e);
        }

        .slider-dot.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.6); opacity: 0.5; }
        }
      `}</style>

      <section className="section testimonials-section">
        <div className="section-inner">
          <div className="reveal">
            <h2 className="section-title">Student Feedback</h2>
            <div className="section-divider section-divider-white" />
          </div>

          <div className="slider-container reveal-scale">
            <div
              style={{
                opacity: fading ? 0 : 1,
                transform: fading ? 'scale(0.97)' : 'scale(1)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              <VideoCard
                key={current}
                src={testimonials[current].src}
                onPlay={() => { setIsPlaying(true); stopTimer() }}
                onPauseOrEnd={() => { setIsPlaying(false); startTimer() }}
              />
            </div>

            <div className="slider-nav">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`slider-dot${i === current ? ' active' : ''}${isPlaying && i !== current ? ' disabled' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}