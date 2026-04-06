import React, { useEffect, useRef } from 'react'
import './OrderConfirm.css'
import clevertap from '../hooks/clevertap'
import { trackCustomEvent } from '../hooks/meta'
import { trackEvent as clarityTrackEvent } from '../hooks/clarity'
import { usePrice } from '../hooks/usePrice'

export default function OrderConfirm({ paymentData = {}, profileData = {}, courseAmount }) {
  const canvasRef = useRef(null)
  const { urgencyVariant } = usePrice()

  useEffect(() => {
    clevertap.event.push('Order Confirmed', { course_name: '3-Day Hairstyle Masterclass', pricing_variant: `pricing_${courseAmount}`, urgency_variant: urgencyVariant, name: paymentData.name, phone: paymentData.phone })
    clarityTrackEvent('Order Confirmed', { course_name: '3-Day Hairstyle Masterclass', pricing_variant: `pricing_${courseAmount}`, urgency_variant: urgencyVariant, name: paymentData.name, phone: paymentData.phone })
    trackCustomEvent('Order Confirmed', {
      course_name: '3-Day Hairstyle Masterclass',
      pricing_variant: `pricing_${courseAmount}`,
      name: paymentData.name,
      phone: paymentData.phone,
    })
  }, [])

  // Confetti animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#e8962e', '#c8702a', '#f7c87a', '#fff8f0', '#d4a44e', '#a85020']
    const pieces = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08,
      vx: (Math.random() - 0.5) * 1.5,
      vy: Math.random() * 2 + 1,
      alpha: 1,
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pieces.forEach(p => {
        ctx.save()
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2)
        ctx.rotate(p.rot)
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
        p.x += p.vx; p.y += p.vy; p.rot += p.rotSpeed
        if (p.y > canvas.height) {
          p.y = -20; p.x = Math.random() * canvas.width; p.alpha = 1
        }
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    // Stop confetti after 4s
    const stop = setTimeout(() => cancelAnimationFrame(raf), 4000)
    return () => { cancelAnimationFrame(raf); clearTimeout(stop) }
  }, [])

  const items = [
    { icon: '🎓', label: 'Course Access', value: 'Hairstyle Masterclass' },
    { icon: '📅', label: 'Dates', value: '8th, 9th & 10th April' },
    { icon: '🕐', label: 'Timings', value: '12 PM – 4 PM' },
    { icon: '📹', label: 'Recording', value: 'Full class video included' },
  ]

  return (
    <div className="oc-page">
      <canvas ref={canvasRef} className="oc-confetti" />

      <div className="oc-card">
        {/* Glow ring */}
        <div className="oc-glow" />

        <div className="oc-badge">
          <div className="oc-badge-ring">
            <span className="oc-check">✓</span>
          </div>
        </div>

        <div className="oc-eyebrow">Payment Confirmed</div>
        <h1 className="oc-heading">
          You're all set!<br />
        </h1>
        <p className="oc-subtext">
          Welcome to the Hairstyle Masterclass. Get ready to transform your skills! 🌟
        </p>

        <div className="oc-divider" />

        <div className="oc-details">
          {items.map(item => (
            <div className="oc-detail-row" key={item.label}>
              <span className="oc-detail-icon">{item.icon}</span>
              <span className="oc-detail-label">{item.label}</span>
              <span className="oc-detail-value">{item.value}</span>
            </div>
          ))}
        </div>

        {paymentData.email && (
          <div className="oc-email-notice">
            <span className="oc-email-icon">📧</span>
            <span>
              Confirmation sent to <strong>{paymentData.email}</strong>
            </span>
          </div>
        )}

        <div className="oc-next">
          <div className="oc-next-title">What happens next?</div>
          <div className="oc-next-steps">
            <div className="oc-next-step">
              <div className="oc-next-num">1</div>
              <div>You'll receive class details on your WhatsApp number</div>
            </div>
            <div className="oc-next-step">
              <div className="oc-next-num">3</div>
              <div>Show up on April 8th at 12 PM — ready to learn!</div>
            </div>
          </div>
        </div>

        <div className="oc-footer-note">
            Any doubts? WhatsApp us on <a href="https://wa.me/917039240054">+91 7039240054</a>       
        </div>
        </div>
    </div>
  )
}