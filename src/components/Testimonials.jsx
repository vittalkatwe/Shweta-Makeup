import React, { useState, useEffect, useRef } from 'react'
import { remoteConfig, fetchAndActivate, getValue } from '../hooks/firebase';

const CHECKOUT_URL = '/?payment=1'

const testimonials = [
  { title: 'TM 1', src: 'https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/testimonials/tanishqa-testimonial.mp4' },
  { title: 'TM 2', src: 'https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/testimonials/vinanti-testimonial.mp4' },
  // { title: 'TM 3', src: 'https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/testimonials/tanishqa-testimonial.mp4' },
  // { title: 'TM 4', src: 'https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/testimonials/vinanti-testimonial.mp4' },
  // { title: 'TM 5', src: 'https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/testimonials/tanishqa-testimonial.mp4' },
  // { title: 'TM 6', src: 'https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/testimonials/vinanti-testimonial.mp4' },
]

function VideoCard({ src, onPlay, onPauseOrEnd }) {
  
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => { setPlaying(true); onPlay?.() }
    const handlePause = () => { setPlaying(false); onPauseOrEnd?.() }
    const handleEnded = () => { setPlaying(false); setProgress(0); setCurrentTime(0); onPauseOrEnd?.() }
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0)
    }
    const handleLoaded = () => setDuration(video.duration)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoaded)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoaded)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.muted = false
      setMuted(false)
      video.play()
    } else {
      video.pause()
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  const handleProgressClick = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    const rect = progressRef.current.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    video.currentTime = ratio * video.duration
  }

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="tm-video-card" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata"
        style={{ pointerEvents: 'none' }}
      />

      {/* Mute overlay - only shown when muted and not yet interacted */}
      {muted && !playing && (
        <div className="tm-mute-overlay">
          <div className="tm-mute-pill">
            <span>🔇</span>
            <span>Tap to play</span>
          </div>
        </div>
      )}

      {/* Center play/pause icon flash */}
      <div className={`tm-play-flash ${playing ? 'pause' : 'play'}`}>
        {playing
          ? <svg viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          : <svg viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
        }
      </div>

      {/* Bottom controls bar */}
      <div className="tm-controls" onClick={e => e.stopPropagation()}>
        {/* Progress bar */}
        <div
          className="tm-progress-track"
          ref={progressRef}
          onClick={handleProgressClick}
        >
          <div className="tm-progress-fill" style={{ width: `${progress}%` }} />
          <div className="tm-progress-thumb" style={{ left: `${progress}%` }} />
        </div>

        <div className="tm-controls-row">
          {/* Play/Pause */}
          <button className="tm-ctrl-btn" onClick={togglePlay}>
            {playing
              ? <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              : <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            }
          </button>

          {/* Time */}
          <span className="tm-time">{formatTime(currentTime)} / {formatTime(duration)}</span>

          {/* Mute */}
          <button className="tm-ctrl-btn tm-ctrl-mute" onClick={toggleMute}>
            {muted
              ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
              : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
            }
          </button>
        </div>
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
        // Fetch and activate Firebase Remote Config
        await fetchAndActivate(remoteConfig);
  
        // Get remote config values
        const price = getValue(remoteConfig, "course_price").asString();
        const original = getValue(remoteConfig, "original_price").asString();
        const variant = getValue(remoteConfig, "pricing_variant").asString();
  
        // Update state with defaults if values are missing
        setCourseAmount(Number(price) || 499);
        setOriginalAmount(Number(original) || 999);
        setPricingVariant(variant || "default");
  
      } catch (err) {
        console.error("Remote config error:", err);
        // fallback to default values
        setCourseAmount(499);
        setOriginalAmount(999);
        setPricingVariant("default");
      }
    }
  
    loadConfig();
  }, []); // run once on mount

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
        /* ── Card wrapper ── */
        .tm-video-card {
          position: relative;
          width: 100%;
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

        /* ── Mute overlay ── */
        .tm-mute-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.28);
          z-index: 3;
        }

        .tm-mute-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 999px;
          padding: 10px 20px;
          color: #fff;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        /* ── Center play flash icon ── */
        .tm-play-flash {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 54px;
          height: 54px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(6px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          opacity: 0;
          transition: opacity 0.15s ease, transform 0.15s ease;
          pointer-events: none;
        }

        .tm-play-flash svg {
          width: 22px;
          height: 22px;
        }

        .tm-video-card:active .tm-play-flash {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        /* ── Controls bar ── */
        .tm-controls {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 10px 12px 14px;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
          z-index: 5;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* ── Progress bar ── */
        .tm-progress-track {
          position: relative;
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.25);
          border-radius: 999px;
          cursor: pointer;
          transition: height 0.15s ease;
        }

        .tm-progress-track:hover {
          height: 5px;
        }

        .tm-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #e8927c, #c9a96e);
          border-radius: 999px;
          pointer-events: none;
          transition: width 0.1s linear;
        }

        .tm-progress-thumb {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 12px;
          height: 12px;
          background: #fff;
          border-radius: 50%;
          pointer-events: none;
          transition: transform 0.15s ease;
          box-shadow: 0 0 4px rgba(0,0,0,0.4);
        }

        .tm-progress-track:hover .tm-progress-thumb {
          transform: translate(-50%, -50%) scale(1);
        }

        /* ── Controls row ── */
        .tm-controls-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tm-ctrl-btn {
          background: none;
          border: none;
          outline: none;
          cursor: pointer;
          color: #fff;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          opacity: 0.9;
          transition: opacity 0.15s, transform 0.15s;
          flex-shrink: 0;
        }

        .tm-ctrl-btn:hover {
          opacity: 1;
          transform: scale(1.12);
        }

        .tm-ctrl-btn:active {
          transform: scale(0.92);
        }

        .tm-ctrl-btn svg {
          width: 18px;
          height: 18px;
        }

        .tm-ctrl-mute {
          margin-left: auto;
        }

        .tm-time {
          font-size: 0.62rem;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.04em;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }

        /* ── Slider dots ── */
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