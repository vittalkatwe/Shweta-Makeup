import React from 'react'

export default function Certificate() {
  return (
    <section className="section certificate-section" data-section="certificate">
      <div className="section-inner" style={{ textAlign: 'center' }}>
        <div className="reveal">
          <h2 className="section-title">Get Certified!</h2>
          <div className="section-divider section-divider-white" />
        </div>

        <div className="certificate-frame reveal-scale">
          <img
            src="https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/certificate-shweta-makeover.jpeg"
            alt="Course Certificate"
            loading="lazy"
          />
        </div>

        {/* <div className="cta-center reveal">
          <a href={CHECKOUT_URL} className="cta-button">
            🚀 Join Now for <strong>₹{courseAmount}</strong>
            <span className="original">₹{originalAmount}</span>
          </a>
        </div> */}
      </div>
    </section>
  )
}