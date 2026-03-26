import React from 'react'

const CHECKOUT_URL =
  '/?payment=1'

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

const points = [
  'You know makeup, but can\'t do hairstyling confidently',
  'You run a beauty parlour and want to increase your income',
  'Clients ask for hairstyles, but you say no',
  'You want to take bridal and function bookings',
  'You want to start earning extra from home',
]

export default function PerfectForYou() {
  return (
    <section className="section perfect-section">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-title">This Masterclass is Perfect for You if</h2>
          <div className="section-divider section-divider-white" />
        </div>

        <div className="reveal" style={{ maxWidth: 680, margin: '0 auto' }}>
          <div className="solution-card">
            {points.map((p, i) => (
              <div className="card-item" key={i}><CheckIcon /><span>{p}</span></div>
            ))}
          </div>
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