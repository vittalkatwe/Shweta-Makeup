import React, { useEffect, useRef } from 'react'

const CHECKOUT_URL =
  '/?payment=1'

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
        <path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z" />
      </svg>
    ),
    text: 'Simple, step-by-step video lessons',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
      </svg>
    ),
    text: 'Learn at your own pace with 1-Year Access',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
      </svg>
    ),
    text: 'Get a must-have product list.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 0 1-1.504-.123 5.976 5.976 0 0 1-3.935 1.107.75.75 0 0 1-.584-1.143 3.478 3.478 0 0 0 .522-1.756C2.979 13.825 2 12.025 2 10Z" clipRule="evenodd" />
      </svg>
    ),
    text: 'Regular Live Q&A Sessions with Lavisha',
  },
]

export default function HeroSection() {
  return (
    <section className="hero-section">
      <ParticleCanvas />
      <div className="hero-inner">
        <div className="hero-eyebrow">✨ Professional Makeup Mastery</div>

        <h1 className="hero-title">
          Struggling with<br />
          <em>Self Makeup?</em><br />
          Look Flawless Every Day!
        </h1>

        <div className="video-container">
          <div className="video-glow" />
          <div className="video-wrapper">
            <iframe
              src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Ffast.wistia.net%2Fembed%2Fiframe%2F0z7k3o9rvk&display_name=Wistia%2C+Inc.&url=https%3A%2F%2Flavishawebflow.wistia.com%2Fmedias%2F0z7k3o9rvk&image=https%3A%2F%2Fembed-ssl.wistia.com%2Fdeliveries%2F9c9a8211ef3635cb190cf8c1536b126f.jpg%3Fimage_crop_resized%3D960x540&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=wistia"
              width="940"
              height="529"
              scrolling="no"
              allowFullScreen
              title="Course overview"
            />
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

        <a href={CHECKOUT_URL} className="cta-button" style={{ animation: 'fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.9s both' }}>
          🚀 Join Now for <strong>₹1,999</strong>
          <span className="original">₹4,999</span>
        </a>
      </div>
    </section>
  )
}