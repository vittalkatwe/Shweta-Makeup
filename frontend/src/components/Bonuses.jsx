import React from 'react'
import { usePrice } from '../hooks/usePrice'

const CHECKOUT_URL = '/payment'

const bonuses = [
  { badge: 'BONUS 1', title: '📖 Easy to Follow Chapter Notes' },
  { badge: 'BONUS 2', title: '🛒 Product Purchase Guide (seller details)' },
]

const delays = ['delay-1', 'delay-2']

export default function Bonuses() {
  const { coursePrice, urgencyTest } = usePrice()

  return (
    <section className="section bonus-section" data-section="bonuses">
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

        <div className="cta-center reveal" data-clarity-unmask="True">
          <a href={CHECKOUT_URL} className={`cta-button${urgencyTest ? ' cta-pulse' : ''}`} data-clarity-unmask="True">
            🚀 Join Now for <strong data-clarity-unmask="True">₹{coursePrice}</strong>
            {urgencyTest && <> <span className="original" data-clarity-unmask="True">₹499</span></>}
          </a>
        </div>
      </div>
    </section>
  )
}
