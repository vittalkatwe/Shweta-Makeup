import React from 'react'
import clevertap from '../hooks/clevertap'

const CHECKOUT_URL =
  '/?payment=1'

export default function StickyBar({ coursePrice }) {
  return (
    <div className="sticky-bar">
      <div>
        <div className="sticky-price">
          ₹{coursePrice}/-
        </div>
      </div>
      <a href={CHECKOUT_URL} className="sticky-cta" onClick={() => clevertap.event.push('homepage_cta_clicked', { section: 'sticky_bar', pricing_variant: `pricing_${coursePrice}` })}>
        🚀 Join Now
      </a>
    </div>
  )
}