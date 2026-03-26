import React from 'react'

const CHECKOUT_URL =
  '/?payment=1'

export default function Certificate() {
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
          <a href={CHECKOUT_URL} className="cta-button">
            🚀 Join Now for <strong>₹499</strong>
            <span className="original">₹999</span>
          </a>
        </div>
      </div>
    </section>
  )
}