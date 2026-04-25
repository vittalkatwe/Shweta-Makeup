import React, { useEffect, useRef } from 'react'
import './OrderConfirm.css'
import clevertap from '../hooks/clevertap'
import { trackCustomEvent } from '../hooks/meta'
import { trackEvent as clarityTrackEvent } from '../hooks/clarity'
import { usePrice } from '../hooks/usePrice'

export default function OrderConfirm({ paymentData = {}, profileData = {}, courseAmount }) {
  const canvasRef = useRef(null)
  const { urgencyVariant, courseDates } = usePrice()

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
    { icon: '📅', label: 'Dates', value: courseDates },
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

        
        <div className="oc-footer-note">
            Any doubts? WhatsApp us on <a href={`https://wa.me/917039240054?text=Hello%2C%20this%20is%20my%20payment%20number%20${paymentData.phone}%2C%20I%20have%20made%20the%20payment.%20This%20is%20my%20confirmation%20message.`}
              target="_blank"
              rel="noopener noreferrer"
              className="oc-wa-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.057 23.55a.75.75 0 0 0 .906.919l5.857-1.533A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.705 9.705 0 0 1-4.999-1.385l-.358-.214-3.718.974.993-3.63-.234-.373A9.705 9.705 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              Confirm on WhatsApp
            </a>       
        </div>

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
              <div>Show up on April 13th at 12 PM — ready to learn!</div>
            </div>
          </div>
        </div>

        
        <div className="oc-footer-note">
            Any doubts? WhatsApp us on <a href={`https://wa.me/917039240054?text=Hello%2C%20this%20was%20my%20payment%20number%20${paymentData.phone}%2C%20I%20have%20made%20the%20payment.%20This%20is%20my%20confirmation%20message.`}
              target="_blank"
              rel="noopener noreferrer"
              className="oc-wa-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.057 23.55a.75.75 0 0 0 .906.919l5.857-1.533A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.705 9.705 0 0 1-4.999-1.385l-.358-.214-3.718.974.993-3.63-.234-.373A9.705 9.705 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              Confirm on WhatsApp
            </a>       
        </div>
        </div>
    </div>
  )
}