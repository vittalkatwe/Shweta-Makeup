import React from 'react'
import clevertap from '../hooks/clevertap'

const CHECKOUT_URL =
  '/?payment=1'

const bonuses = [
  { badge: 'BONUS 1', title: '📖 Easy to Follow Chapter Notes' },
  { badge: 'BONUS 2', title: '🛒 Product Purchase Guide (seller details)' },
]

const delays = ['delay-1', 'delay-2']

export default function Bonuses({ coursePrice }) {
  return (
    <section className="section bonus-section">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-title">🎁 ₹10,000 Worth of Exclusive Bonuses with this Course</h2>
          <div className="section-divider" />
        </div>

        <div className="bonus-grid">
          {bonuses.map((b, i) => (
            <div className={`bonus-card reveal-scale ${delays[i]}`} key={b.badge}>
              <div className="bonus-badge">{b.badge}</div>
              <div className="bonus-content">
                <div className="bonus-content-title">{b.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-center reveal">
          <a href={CHECKOUT_URL} className="cta-button" onClick={() => clevertap.event.push('homepage_cta_clicked', { section: 'bonuses', pricing_variant: `pricing_${coursePrice}` })}>
            🚀 Join Now for <strong>₹{coursePrice}</strong>
          </a>
        </div>
      </div>
    </section>
  )
}