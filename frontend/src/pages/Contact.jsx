import React from 'react'

const SHARED_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600;700&display=swap');

  body {
    padding-bottom: 0px;
  }

  .lp-page {
    min-height: 100vh;
    background: #1a1a1a;
    color: #e8e0d8;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
  }

  .lp-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 70px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .lp-logo {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
  }

  .lp-login-btn {
    background: #e85454;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 10px 24px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s;
  }

  .lp-login-btn:hover { background: #d94040; }

  .lp-hero {
    position: relative;
    padding: 50px 40px 0;
    overflow: hidden;
  }

  .lp-hero-watermark {
    font-family: 'arial', serif;
    font-size: clamp(70px, 12vw, 150px);
    font-weight: 300;
    color: rgba(255,255,255,0.045);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    margin: 0;
    padding-bottom: 40px;
  }

  .lp-content {
    padding: 10px 40px 80px;
    max-width: 900px;
  }

  .lp-intro {
    font-size: 0.84rem;
    line-height: 1.9;
    color: rgba(232,224,216,0.78);
    font-weight: 300;
    margin: 0 0 40px;
  }

  .lp-section { margin-bottom: 44px; }

  .lp-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 400;
    color: #fff;
    margin: 0 0 16px;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  .lp-section-body {
    font-size: 0.82rem;
    line-height: 1.9;
    color: rgba(232,224,216,0.72);
    font-weight: 300;
    margin: 0;
    white-space: pre-line;
  }

  .lp-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin: 44px 0;
  }

  .lp-footer {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 28px 40px;
    font-size: 0.72rem;
    color: rgba(232,224,216,0.35);
    font-weight: 300;
    letter-spacing: 0.03em;
  }

  .lp-footer a { color: rgba(232,224,216,0.5); text-decoration: none; }
  .lp-footer a:hover { color: #fff; }

  /* ── Branch Cards ── */
  .contact-branches {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 44px;
  }

  .contact-branch-card {
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    padding: 32px 28px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .contact-branch-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #e85454, transparent);
  }

  .contact-branch-card:hover {
    border-color: rgba(255,255,255,0.18);
  }

  .contact-branch-label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #e85454;
    margin: 0 0 12px;
  }

  .contact-branch-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: #fff;
    margin: 0 0 20px;
    line-height: 1.2;
  }

  .contact-info-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 14px;
  }

  .contact-info-icon {
    font-size: 14px;
    margin-top: 2px;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .contact-info-text {
    font-size: 0.8rem;
    line-height: 1.7;
    color: rgba(232,224,216,0.65);
    font-weight: 300;
  }

  .contact-info-text a {
    color: rgba(232,224,216,0.65);
    text-decoration: none;
    transition: color 0.2s;
  }

  .contact-info-text a:hover {
    color: #fff;
  }

  /* ── Direct contact block ── */
  .contact-direct {
    margin-top: 48px;
    padding: 32px 28px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
  }

  .contact-direct-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: #fff;
    margin: 0 0 10px;
  }

  .contact-direct-body {
    font-size: 0.82rem;
    line-height: 1.8;
    color: rgba(232,224,216,0.6);
    font-weight: 300;
    margin: 0 0 20px;
  }

  .contact-btn-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .contact-wa-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #25D366;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
  }
  .contact-wa-btn:hover {
    background: #1fb855;
    transform: translateY(-1px);
  }

  .contact-email-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: rgba(232,224,216,0.75);
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 12px 24px;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.15);
    text-decoration: none;
    transition: all 0.2s;
  }
  .contact-email-btn:hover {
    border-color: rgba(255,255,255,0.35);
    color: #fff;
  }

  @media (max-width: 640px) {
    .lp-nav { padding: 0 20px; }
    .lp-hero { padding: 30px 20px 0; }
    .lp-content { padding: 10px 20px 60px; }
    .lp-footer { padding: 24px 20px; }
    .lp-hero-watermark { font-size: clamp(52px, 14vw, 90px); }
    .contact-branches { grid-template-columns: 1fr; }
  }
`

export default function Contact() {
  return (
    <>
      <style>{SHARED_STYLES}</style>
      <div className="lp-page">
        <nav className="lp-nav">
          <a href="/" className="lp-logo">Shweta Celeb<br /> Makeover</a>
          <a href="/" className="lp-login-btn">Go Back</a>
        </nav>

        <div className="lp-hero">
          <p className="lp-hero-watermark">Contact Us</p>
        </div>

        <div className="lp-content">
          <p className="lp-intro">
            We'd love to hear from you. Reach out to either of our branches for course inquiries, enrollment support, or any general questions. Our team is available on WhatsApp for the fastest response.
          </p>

          <div className="contact-branches">
            {/* Branch 1 */}
            <div className="contact-branch-card">
              <p className="contact-branch-label">Branch 01</p>
              <h2 className="contact-branch-name">Hubli</h2>

              <div className="contact-info-row">
                <span className="contact-info-icon">📍</span>
                <p className="contact-info-text">
                  303 Nilgiri Garden,<br />
                  New Badami Nagar,<br />
                  Hubli, Karnataka – 580023
                </p>
              </div>

              <div className="contact-info-row">
                <span className="contact-info-icon">📞</span>
                <p className="contact-info-text">
                  <a href="tel:+917676363793">+91 76763 63793</a><br />
                  <a href="tel:+919066394478">+91 90663 94478</a>
                </p>
              </div>

              <div className="contact-info-row">
                <span className="contact-info-icon">👤</span>
                <p className="contact-info-text">Vishal Katwe</p>
              </div>

              <div className="contact-info-row">
                <span className="contact-info-icon">✉️</span>
                <p className="contact-info-text">
                  <a href="mailto:vishal@shwetamakeover.in">vishal@shwetamakeover.in</a>
                </p>
              </div>
            </div>

            {/* Branch 2 */}
            <div className="contact-branch-card">
              <p className="contact-branch-label">Branch 02</p>
              <h2 className="contact-branch-name">Mumbai</h2>

              <div className="contact-info-row">
                <span className="contact-info-icon">📍</span>
                <p className="contact-info-text">
                  Shop 7, Shree Complex,<br />
                  Linking Road, Bandra West,<br />
                  Mumbai, Maharashtra – 400050
                </p>
              </div>

              <div className="contact-info-row">
                <span className="contact-info-icon">📞</span>
                <p className="contact-info-text">
                  <a href="tel:+917676363793">+91 76763 63793</a><br />
                  <a href="tel:+919066394478">+91 90663 94478</a>
                </p>
              </div>

              <div className="contact-info-row">
                <span className="contact-info-icon">👤</span>
                <p className="contact-info-text">Vishal Katwe</p>
              </div>

              <div className="contact-info-row">
                <span className="contact-info-icon">✉️</span>
                <p className="contact-info-text">
                  <a href="mailto:vishal@shwetamakeover.in">vishal@shwetamakeover.in</a>
                </p>
              </div>
            </div>
          </div>

          <hr className="lp-divider" />

          <div className="contact-direct">
            <p className="contact-direct-title">Prefer to chat directly?</p>
            <p className="contact-direct-body">
              WhatsApp is the quickest way to reach us. For enrollment queries, payment issues, or course-related questions — we typically respond within a few hours.
            </p>
            <div className="contact-btn-row">
              <a href="https://wa.me/917676363793" className="contact-wa-btn" target="_blank" rel="noopener noreferrer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
              <a href="mailto:vishal@shwetamakeover.in" className="contact-email-btn">
                ✉ Email Us
              </a>
            </div>
          </div>
        </div>

        <div className="lp-footer">
          © 2026 Shweta Kapoor &nbsp;·&nbsp;
          <a href="/privacy">Privacy Policy</a> &nbsp;·&nbsp;
          <a href="/terms">Terms of Use</a> &nbsp;·&nbsp;
          <a href="/refund">Refund Policy</a> &nbsp;·&nbsp;
          <a href="/contact">Contact</a>
        </div>
      </div>
    </>
  )
}