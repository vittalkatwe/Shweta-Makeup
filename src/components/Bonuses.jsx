import React from 'react'

const CHECKOUT_URL =
  '/?payment=1'

const bonuses = [
  { badge: 'BONUS 1', title: '📖 Easy to Follow Chapter Notes' },
  { badge: 'BONUS 2', title: '🛒 Product Purchase Guide (seller details)' },
]

const delays = ['delay-1', 'delay-2']

export default function Bonuses() {
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
          <a href={CHECKOUT_URL} className="cta-button">
            🚀 Join Now for <strong>₹499</strong>
            <span className="original">₹999</span>
          </a>
        </div>
      </div>
    </section>
  )
}