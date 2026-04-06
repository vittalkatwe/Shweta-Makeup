import React from 'react'
import { usePrice } from '../hooks/usePrice'

const CHECKOUT_URL = '/payment'

export default function StickyBar() {
  const { coursePrice, urgencyTest } = usePrice()

  return (
    <div className="sticky-bar" data-clarity-unmask="True">
      <div>
        <div className="sticky-price">
          <strong data-clarity-unmask="True">₹{coursePrice}/-</strong>
          {urgencyTest && <span className="original" data-clarity-unmask="True">₹499</span>}
        </div>
        {urgencyTest ? (
          <div className="sticky-offer-text sticky-seats">
            <span className="seats-dot" /> Only <strong>2 seats</strong> remaining
          </div>
        ) : (
          <div className="sticky-offer-text">🌟 Limited-Time Offer</div>
        )}
      </div>
      <a href={CHECKOUT_URL} className={`sticky-cta${urgencyTest ? ' cta-pulse' : ''}`} data-clarity-unmask="True">
        🚀 Join Now <strong data-clarity-unmask="True">₹{coursePrice}</strong>
      </a>
    </div>
  )
}
