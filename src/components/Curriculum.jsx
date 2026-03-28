import React from 'react'
import clevertap from '../hooks/clevertap'

const CHECKOUT_URL =
  '/?payment=1'

const parts = [
  {
    label: 'Part 1',
    title: 'Front Hairstyle Mastery',
    items: [
      { bold: 'Learn 12 different front hairstyle variations', text: 'for different face shapes, occasions, and looks.' },
      { bold: 'Create styles that look modern, trendy, and client-ready', text: '– perfect for real salon use.' },
      { bold: 'Understand how to adjust styles', text: 'based on hair volume and length for every client.' },
    ],
  },
  {
    label: 'Part 2',
    title: '👰 Bridal Hairstyling',
    items: [
      { bold: 'Step-by-step training on 2 bridal buns', text: '(perfect for weddings & events).' },
      { bold: 'Learn how to create full, heavy, and elegant bridal looks', text: 'that wow clients.' },
      { bold: 'Make hairstyles that last 8–10 hours', text: 'without loosening throughout the event.' },
    ],
  },
  {
    label: 'Part 3',
    title: '💎 Professional Finishing',
    items: [
      { bold: 'Learn brooch making & styling', text: 'to give a premium, decorated finish to every look.' },
      { bold: 'Make your hairstyles look highly-attractive and high-end', text: 'for better client satisfaction.' },
      { bold: 'Small detailing techniques', text: 'that make a big difference in the final look.' },
    ],
  },
  {
    label: 'Part 4',
    title: '⚡ Speed & Client Handling',
    items: [
      { bold: 'Learn how to complete hairstyles in 30–40 minutes', text: 'efficiently and professionally.' },
      { bold: 'Handle multiple clients efficiently', text: 'during busy wedding/function days without stress.' },
      { bold: 'Work with confidence on real clients', text: 'without hesitation.' },
    ],
  },
  {
    label: 'Part 5',
    title: '💰 Earning-Focused Skills',
    items: [
      { bold: 'Learn how to create hairstyles that you can charge more per client', text: 'and grow your income.' },
      { bold: 'Offer makeup + hairstyle packages', text: 'to increase your total billing per appointment.' },
      { bold: 'Build skills that help you start earning from home', text: 'or grow your existing orders.' },
    ],
  },
]

export default function Curriculum({ coursePrice }) {
  return (
    <section className="section curriculum-section">
      <div className="section-inner">
        <div className="curriculum-header">
          <div className="curriculum-intro reveal-left">
            <h2 className="section-title">What You'll Learn</h2>
            <div className="section-divider" style={{ margin: '14px 0 0', textAlign: 'left' }} />
            <p style={{ marginTop: 20 }}>
              This 3 Day hairstyle masterclass is designed to learn trendy Hairstyles that clients
              actually ask for. Learn everything from essential techniques to advanced bridal styles,
              and confidently create instagram like looks.
            </p>
          </div>
          <div className="reveal-right">
            <a href={CHECKOUT_URL} className="cta-button" style={{ maxWidth: 260, fontSize: 15, padding: '14px 24px' }} onClick={() => clevertap.event.push('homepage_cta_clicked', { section: 'curriculum', pricing_variant: `pricing_${coursePrice}` })}>
              🚀 Join Now for <strong>₹{coursePrice}</strong>
            </a>
          </div>
        </div>

        <div className="curriculum-parts">
          {parts.map((part, i) => (
            <div className={`curriculum-part reveal delay-${i + 1}`} key={part.label}>
              <span className="part-label">{part.label}</span>
              <h3 className="part-title">{part.title}</h3>
              <div className="part-items">
                {part.items.map((item) => (
                  <div className="part-item" key={item.bold}>
                    <strong>{item.bold}</strong> {item.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="cta-center reveal">
          <a href={CHECKOUT_URL} className="cta-button" onClick={() => clevertap.event.push('homepage_cta_clicked', { section: 'curriculum', pricing_variant: `pricing_${coursePrice}` })}>
            🚀 Join Now for <strong>₹{coursePrice}</strong>
          </a>
        </div>
      </div>
    </section>
  )
}