import React from 'react'

const SHARED_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600;700&display=swap');


  body{
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
    font-family: 'arial ', serif;
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

  .lp-cta-block {
    margin-top: 48px;
    padding: 32px 28px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
  }

  .lp-cta-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: #fff;
    margin: 0 0 10px;
  }

  .lp-cta-body {
    font-size: 0.82rem;
    line-height: 1.8;
    color: rgba(232,224,216,0.6);
    font-weight: 300;
    margin: 0 0 20px;
  }

  .lp-cta-btn {
    display: inline-block;
    background: #e85454;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 12px 28px;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.2s;
  }

  .lp-cta-btn:hover { background: #d94040; }

  @media (max-width: 600px) {
    .lp-nav { padding: 0 20px; }
    .lp-hero { padding: 30px 20px 0; }
    .lp-content { padding: 10px 20px 60px; }
    .lp-footer { padding: 24px 20px; }
    .lp-hero-watermark { font-size: clamp(52px, 14vw, 90px); }
  }
`

export default function Refund() {
  return (
    <>
      <style>{SHARED_STYLES}</style>
      <div className="lp-page">
        <nav className="lp-nav">
          <a href="/" className="lp-logo">Shweta Celeb<br/> Makeover</a>
          <a href="/" className="lp-login-btn">Go Back</a>
        </nav>

        <div className="lp-hero">
          <p className="lp-hero-watermark">Refund Policy</p>
        </div>

        <div className="lp-content">
          <p className="lp-intro">
            With this course we are committed to delivering top-quality content and an exceptional learning experience. Before enrolling, we encourage you to carefully review the course details, as all sales are final and we maintain a strict no-refund policy.
          </p>

          <div className="lp-section">
            <h2 className="lp-section-title">No Refund Policy</h2>
            <p className="lp-section-body">All sales are final. Once a purchase has been made, we do not offer refunds, exchanges, or cancellations under any circumstances. Before enrolling, we strongly encourage you to thoroughly review all course details, module descriptions, and sample content to ensure the course is right for you.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Our Quality Promise</h2>
            <p className="lp-section-body">We are confident that our online makeup course will meet and exceed your expectations. Every lesson has been crafted with care and expertise, designed to deliver real, practical skills. We stand behind the quality of our content and look forward to helping you achieve your beauty goals.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Need Help or Have Questions?</h2>
            <p className="lp-section-body">If you have any questions or concerns about the course before enrolling, our customer support team is here to assist. Feel free to reach out and we'll be happy to provide detailed information to help you make an informed decision.</p>
          </div>

          <div className="lp-cta-block">
            <p className="lp-cta-title">Speak to our support team</p>
            <p className="lp-cta-body">Available to answer all your questions before you enroll. We want you to feel fully confident in your decision.</p>
            <a href="https://wa.me/917039240054" className="lp-cta-btn">WhatsApp +91 7039240054</a>
          </div>
        </div>

        <div className="lp-footer">
          © 2026 Shweta Kapoor &nbsp;·&nbsp; <a href="/privacy">Privacy Policy</a> &nbsp;·&nbsp; <a href="/terms">Terms of Use</a> &nbsp;·&nbsp; <a href="/refund">Refund Policy</a>
        </div>
      </div>
    </>
  )
}