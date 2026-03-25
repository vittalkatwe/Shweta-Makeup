import React from 'react'

const CHECKOUT_URL =
  '/?payment=1'

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

const problems = [
  'Makeup feels confusing and difficult.',
  'You waste money on wrong makeup products.',
  "Your makeup doesn't last or turns grey after some time.",
  "You want to try different makeup looks but don't know how.",
  'You spend time and money to get makeup done from parlours.',
]
const solutions = [
  'Learn step-by-step techniques for your skin type, face shape, and eye shape.',
  'Get list of makeup & skincare products that actually work for your skin type.',
  'Master the right skincare & base application techniques for long-lasting makeup.',
  'Learn how to create stunning makeup looks—from everyday natural styles to bold glam!',
  'Do it yourself anytime, anywhere—get the exact look you love without the hassle or extra cost!',
]

export default function PerfectForYou() {
  return (
    <section className="section perfect-section">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-title">This Course is Perfect for You if</h2>
          <div className="section-divider section-divider-white" />
        </div>

        <div className="two-col-grid">
          <div className="problem-card reveal-left">
            <div className="card-title">Your Struggle 😞</div>
            {problems.map((p, i) => (
              <div className="card-item" key={i}><XIcon /><span>{p}</span></div>
            ))}
          </div>
          <div className="solution-card reveal-right">
            <div className="card-title">How This Course Fixes It ✅</div>
            {solutions.map((s, i) => (
              <div className="card-item" key={i}><CheckIcon /><span>{s}</span></div>
            ))}
          </div>
        </div>

        <div className="cta-center reveal">
          <a href={CHECKOUT_URL} className="cta-button">
            🚀 Join Now for <strong>₹1,999</strong>
            <span className="original">₹5,000</span>
          </a>
        </div>
      </div>
    </section>
  )
}