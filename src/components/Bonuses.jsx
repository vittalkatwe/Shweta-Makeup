import React from 'react'

const CHECKOUT_URL =
  '/?payment=1'

const bonuses = [
  { badge: 'BONUS 1', title: '🤝 Exclusive Community Access', desc: 'Be part of a private, supportive group where you can share progress, ask questions, and get feedback from me and fellow makeup lovers.' },
  { badge: 'BONUS 2', title: '💬 Regular Live Q&A with Lavisha', desc: 'Got questions? Need help picking the right products? Join interactive Q&A sessions where I personally answer your doubts.' },
  { badge: 'BONUS 3', title: '📖 Easy-to-Follow Chapter Notes', desc: 'No need to rewind videos again and again! Get clear, step-by-step notes for every lesson so you can practice with confidence anytime.' },
  { badge: 'BONUS 4', title: '🔥 Regular Content & Resource Updates', desc: 'Makeup trends keep changing, so we constantly update the course with new tutorials, product recommendations, and expert techniques to keep you ahead.' },
]

const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4']

export default function Bonuses() {
  return (
    <section className="section bonus-section">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-title">🎁 ₹20,000+ Worth of Exclusive Bonuses</h2>
          <div className="section-divider" />
          <p className="bonus-subtitle">
            When you join today, you get extra perks worth <span>₹20,000+</span> to help you master
            self-makeup with confidence!
          </p>
        </div>

        <div className="bonus-grid">
          {bonuses.map((b, i) => (
            <div className={`bonus-card reveal-scale ${delays[i]}`} key={b.badge}>
              <div className="bonus-badge">{b.badge}</div>
              <div className="bonus-content">
                <div className="bonus-content-title">{b.title}</div>
                <p>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-center reveal">
          <a href={CHECKOUT_URL} className="cta-button">
            🚀 Join Now for <strong>₹1,999</strong>
            <span className="original">₹4,999</span>
          </a>
        </div>
      </div>
    </section>
  )
}