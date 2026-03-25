import React from 'react'

const CHECKOUT_URL =
  '/?payment=1'

const parts = [
  {
    label: 'Part 1',
    title: 'Understanding Your Skin & Preparing for Makeup',
    items: [
      { bold: 'Course Introduction', text: '– Learn about the course structure and how to get the best learning experience.' },
      { bold: 'Knowing Your Skin Type', text: '– Identify whether your skin is oily, dry, or normal and choose the right products.' },
      { bold: 'Skincare Product Knowledge', text: '– Understand essential skincare steps for a smooth and glowing base.' },
    ],
  },
  {
    label: 'Part 2',
    title: 'Learning Makeup Products & Tools',
    items: [
      { bold: 'Makeup Product Knowledge', text: '– Learn about different makeup products and how to use them correctly.' },
      { bold: 'Makeup Tools Knowledge', text: '– Get familiar with brushes, sponges, and applicators for professional results.' },
      { bold: 'Color Theory', text: '– Discover how colors work together to enhance your beauty.' },
      { bold: 'Choosing the Right Makeup Shades', text: '– Pick the perfect foundation, lipstick, and eyeshadow for your skin tone.' },
    ],
  },
  {
    label: 'Part 3',
    title: 'Creating a Flawless Base',
    items: [
      { bold: 'CTMP Process', text: '– Master the Cleanse, Tone, Moisturize, Prime routine for a long-lasting base.' },
      { bold: 'Color Correction', text: '– Learn how to cover dark circles, redness, and blemishes using color theory.' },
      { bold: 'Base Application Techniques', text: '– Apply foundation & concealer seamlessly for an even, smooth look.' },
    ],
  },
  {
    label: 'Part 4',
    title: 'Eye Makeup Techniques & Signature Looks',
    items: [
      { bold: 'Eye Shape Knowledge', text: '– Understand your eye shape and enhance it with the right makeup techniques.' },
      { bold: 'The Nude Makeup Look', text: '– Create a soft, natural look perfect for everyday wear.' },
      { bold: 'Matte Base with Halo Eyes', text: '– Achieve an elegant and sophisticated look for special occasions.' },
      { bold: 'Glam Look with Smokey Eyes', text: '– Learn how to create a bold, classic smokey eye.' },
      { bold: 'Cut Crease Eye Makeup', text: '– Master the cut crease technique for sharp, defined eye makeup.' },
    ],
  },
]

export default function Curriculum() {
  return (
    <section className="section curriculum-section">
      <div className="section-inner">
        <div className="curriculum-header">
          <div className="curriculum-intro reveal-left">
            <h2 className="section-title">What You'll Learn</h2>
            <div className="section-divider" style={{ margin: '14px 0 0', textAlign: 'left' }} />
            <p style={{ marginTop: 20 }}>
              This 16-chapter course is designed to help you master self-makeup with ease. Follow each
              step to build your skills from the basics to advanced makeup looks.
            </p>
          </div>
          <div className="reveal-right">
            <a href={CHECKOUT_URL} className="cta-button" style={{ maxWidth: 260, fontSize: 15, padding: '14px 24px' }}>
              🚀 Join Now for <strong>₹1,999</strong>
              <span className="original">₹4,999</span>
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
          <a href={CHECKOUT_URL} className="cta-button">
            🚀 Join Now for <strong>₹1,999</strong>
            <span className="original">₹4,999</span>
          </a>
        </div>
      </div>
    </section>
  )
}