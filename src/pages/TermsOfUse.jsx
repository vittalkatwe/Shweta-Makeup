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

  @media (max-width: 600px) {
    .lp-nav { padding: 0 20px; }
    .lp-hero { padding: 30px 20px 0; }
    .lp-content { padding: 10px 20px 60px; }
    .lp-footer { padding: 24px 20px; }
    .lp-hero-watermark { font-size: clamp(52px, 14vw, 90px); }
  }
`

export default function TermsOfUse() {
  return (
    <>
      <style>{SHARED_STYLES}</style>
      <div className="lp-page">
        <nav className="lp-nav">
          <a href="/" className="lp-logo">Shweta Celeb <br/> Makeover</a>
          <a href="/" className="lp-login-btn">Go Back</a>
        </nav>

        <div className="lp-hero">
          <p className="lp-hero-watermark">Terms of Use</p>
        </div>

        <div className="lp-content">
          <p className="lp-intro">
            Shweta Kapoor welcomes you to shwetamakeover.online ("Site"). The Site is owned, controlled and operated by Shweta Kapoor as its proprietor ("Firm", "us", "we", "our"). These Terms of Use ("Terms") govern your access to and use of the Site. By visiting, browsing, accessing, or using the Site, you unconditionally accept and agree to be legally bound by these Terms. If you do not agree, do not access or use the Site.
          </p>

          <div className="lp-section">
            <h2 className="lp-section-title">Age &amp; Eligibility</h2>
            <p className="lp-section-body">The Site is intended for adults or people who have attained the age of majority. The Site is strictly prohibited to persons under the age of 10. Use of the Site is available only to persons who can enter into legally binding contracts under applicable law. If you are under 18 years of age, your parent or legal guardian must agree to these Terms on your behalf.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Amendments to Terms</h2>
            <p className="lp-section-body">We reserve the right, at any time, to amend, modify, revise, update, suspend, or otherwise change these Terms without prior notice. All amendments take effect immediately when posted on the Site. By continuing to access or browse the Site after any amendments, you agree to be bound by the updated Terms. We encourage you to review these Terms whenever you access the Site.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">The Website</h2>
            <p className="lp-section-body">The Site is designed for informational purposes only and is not intended to provide professional advice of any nature. Content is intended solely for your personal, non-commercial use. We do not provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information on the Site. Your use of any content is entirely at your own risk.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Payments &amp; Refunds</h2>
            <p className="lp-section-body">Except where otherwise provided, access to and use of the Site is without charge. We reserve the right to charge fees for access to services on the Site. If you purchase a paid service, payments may be processed by a third-party payment gateway. Please note — any amounts paid to us are not refundable. Please review our Refund Policy before making any purchase.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Accounts &amp; Security</h2>
            <p className="lp-section-body">If you register for an account, you must provide current, complete and accurate information. It is your responsibility to maintain the confidentiality of your password and account. You are entirely responsible for any and all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss resulting from unauthorized use of your password or account.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Intellectual Property</h2>
            <p className="lp-section-body">The Site and all its content — including copyrighted works, text, graphics, logos, images, audio/video clips, data compilations and software — are owned by us or used with consent of the owner, and are protected by applicable laws. Reproduction and use of any Site content is prohibited unless specific written permission is provided by us. All rights in the Site and its content are reserved.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Limited License</h2>
            <p className="lp-section-body">Subject to these Terms, we grant you a non-exclusive, revocable, non-sublicensable, non-transferable, and limited license to access the Site solely for your personal and non-commercial use. You shall not copy, adapt, modify, decompile, distribute, or use the Site to provide services to third parties. Any unauthorized use strictly violates these Terms.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">User Content</h2>
            <p className="lp-section-body">All content created, uploaded, submitted or posted on the Site by users ("User Content") is the sole responsibility of the user who created it. You represent that all User Content is accurate, complete, and in compliance with all applicable laws. By submitting User Content, you grant us a worldwide, non-exclusive, perpetual, royalty-free license to use, reproduce, distribute, display and otherwise exploit such content in connection with the Site and our services.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">User Code of Conduct</h2>
            <p className="lp-section-body">As a condition of use, you agree not to use the Site for any unlawful, threatening, abusive, defamatory, fraudulent, or otherwise inappropriate purpose. You shall not interfere with or disrupt the Site, attempt to gain unauthorized access, run spam or auto-responders, or use automated tools to crawl the Site. You shall abide by all applicable laws with respect to use of the Site.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Disclaimer</h2>
            <p className="lp-section-body">The Site and all content are provided on an "as is" and "as available" basis, without warranty of any kind, express or implied. We make no warranty that the Site will meet your requirements or be uninterrupted, timely, secure, or error-free. We specifically disclaim all liability for any actions resulting from your use of the Site.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Limitation of Liability</h2>
            <p className="lp-section-body">In no event shall we, our affiliates, licensors and partners be liable for any lost profits, loss of data, business interruption, or special, indirect, incidental, punitive or consequential damages of any kind. Our total liability shall not exceed ₹1,000 (Rupees One Thousand only) or the fees paid to us for usage of the Site, whichever is lower.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Governing Law &amp; Disputes</h2>
            <p className="lp-section-body">These Terms are governed by the laws of India, without regard to conflict of law principles. The courts at India shall have exclusive jurisdiction for all matters arising out of or in connection with these Terms. Any disputes shall first be attempted to be resolved amicably, failing which they shall be settled by arbitration under the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be India, and the language shall be English.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Termination</h2>
            <p className="lp-section-body">You may stop using the Site at any time. We may, at any time, terminate your right to access and use the Site if you breach any provision of these Terms or if required to do so by applicable law. Upon termination, all licenses and rights provided by us shall cease immediately. Any and all rights granted to the user will immediately be terminated, and the user shall promptly discontinue all use of the Site.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Contact Us</h2>
            <p className="lp-section-body">{`Shweta Kapoor
            WhatsApp Number: +91 7039240054

Effective Date: March 2026
Copyright 2026: Shweta Kapoor. All rights reserved.`}</p>
          </div>
        </div>

        <div className="lp-footer">
          © 2026 Shweta Kapoor &nbsp;·&nbsp; <a href="/privacy">Privacy Policy</a> &nbsp;·&nbsp; <a href="/terms">Terms of Use</a> &nbsp;·&nbsp; <a href="/refund">Refund Policy</a> &nbsp;·&nbsp; <a href="/contact">Contact</a>
        </div>
      </div>
    </>
  )
}