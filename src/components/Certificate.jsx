import React from 'react'
import clevertap from '../hooks/clevertap'

const CHECKOUT_URL =
  '/?payment=1'

export default function Certificate({ coursePrice }) {
  return (
    <section className="section certificate-section">
      <div className="section-inner" style={{ textAlign: 'center' }}>
        <div className="reveal">
          <h2 className="section-title">Get Certified!</h2>
          <div className="section-divider section-divider-white" />
        </div>

        <div className="certificate-frame reveal-scale">
          <img
            src="https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67004e79818c2c7882db7aba_Lavisha%20Frame%2059%20(2).png"
            alt="Course Certificate"
            loading="lazy"
          />
        </div>

        <div className="cta-center reveal">
          <a href={CHECKOUT_URL} className="cta-button" onClick={() => clevertap.event.push('homepage_cta_clicked', { section: 'certificate', pricing_variant: `pricing_${coursePrice}` })}>
            🚀 Join Now for <strong>₹{coursePrice}</strong>
          </a>
        </div>
      </div>
    </section>
  )
}