import React from 'react'

const CHECKOUT_URL =
  '/?payment=1'

export default function StickyBar() {
  return (
    <div className="sticky-bar">
      <div>
        <div className="sticky-price">
          ₹499/- <span className="original">₹999</span>
        </div>
        <div className="sticky-offer-text">🌟 Limited-Time — 50% Off</div>
      </div>
      <a href={CHECKOUT_URL} className="sticky-cta">
        🚀 Join Now
      </a>
    </div>
  )
}