import React, { useState } from 'react'

const faqs = [
  { q: 'How long is the course and what content does it include?', a: 'The course comprises 16 lessons totaling over 4 hours of content, covering all aspects of makeup from makeup theory to practical techniques.' },
  { q: 'Can beginners enroll in this course?', a: 'YES! This course is suitable for beginners as it starts with the basics and gradually progresses to more advanced & practical techniques.' },
  { q: 'Will I receive a certificate upon completing the course?', a: 'Yes, upon completion of the course, you will receive a certificate acknowledging your new skills and knowledge in makeup.' },
  { q: 'Is there any support available during the course?', a: 'Yes, you can participate in monthly live Q&A sessions for direct support from Shweta, and you can also engage with peers and experts through the exclusive course community section in the app.' },
  { q: "In which languages is Shweta Celeb Makeover's Makeup Mastery Course available?", a: "Hinglish — it's just as if we were speaking with you one-on-one. Moreover the use of Hindi is more than the use of English." },
  { q: "I made the payment but didn't receive any confirmation email?", a: 'WhatsApp us on +91 7039240054 — our dedicated support team will get back to you in 24 hours.' },
]

const PlusIcon = ({ open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`faq-icon${open ? ' open' : ''}`}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="section faq-section">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-title">FAQ</h2>
          <div className="section-divider" />
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div className={`faq-item reveal delay-${Math.min(i + 1, 6)}`} key={i}>
              <button
                className="faq-question-btn"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.q}</span>
                <PlusIcon open={openIndex === i} />
              </button>
              <div className={`faq-answer${openIndex === i ? ' open' : ''}`}>
                <div className="faq-answer-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer-links">
          <a href="/terms-of-use">Terms of Use</a>
          <a href="/refund">Refund</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </section>
  )
}