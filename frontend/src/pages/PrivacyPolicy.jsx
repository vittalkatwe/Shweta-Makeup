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
    margin: 0 0 16px;
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

export default function PrivacyPolicy() {
  return (
    <>
      <style>{SHARED_STYLES}</style>
      <div className="lp-page">
        <nav className="lp-nav">
          <a href="/" className="lp-logo">Shweta Celeb<br/> Makeover</a>
          <a href="/" className="lp-login-btn">Go Back</a>
        </nav>

        <div className="lp-hero">
          <p className="lp-hero-watermark">Privacy Policy</p>
        </div>

        <div className="lp-content">
          <p className="lp-intro">
            We know you care about how your personal information is used and shared, and we take your privacy seriously. We have therefore created this Privacy Policy in order to clearly communicate our commitment to your privacy. Please read the following to learn more about our Privacy Policy. By using or accessing the Site and the services provided by us in any manner, you acknowledge that you accept the practices and policies outlined in this Privacy Policy, and you hereby consent that we will collect, use, and share your information in the manner specified in this Privacy Policy.
          </p>
          <p className="lp-intro" style={{ marginBottom: '40px' }}>
            Remember that your use of the Site is at all times subject to the Terms of Use which incorporates this Privacy Policy. Any terms we use in this Policy without defining them have the definitions given to them in the Terms. The general provisions as outlined in the Terms shall be applicable to this Privacy Policy as well.
          </p>

          <div className="lp-section">
            <h2 className="lp-section-title">How We Collect Personal and Other Information</h2>
            <p className="lp-section-body">{`When you visit the Site, you can browse without submitting any personal information about yourself. We will, however, receive and store some non-personally identifiable information about your visit.

When you register or create an account, we collect information you provide voluntarily, including:

• Name (first, middle, last names)
• Profile Name & Username
• Email address
• Gender
• Mobile Number
• Password

When you access or use our Site, we also automatically collect data about the pages you access, your IP address, device type, geo-location (with consent), connection information, page view statistics, referral URLs, ad data, and standard web log data.`}</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Cookies &amp; Tracking Technologies</h2>
            <p className="lp-section-body">The Site uses persistent and session cookies and other similar technologies to offer you a personalized experience and to remember your browsing preferences, including your log-in details and choice of language. Cookies are stored primarily to ensure that when you return to the Site, it personalizes your browsing experience. You can disable cookies through your browser settings, though this may impact many of the Site's features. We and our third-party advertising partners may also use technologies such as web beacons to better manage and analyse content.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">How We Use Your Information</h2>
            <p className="lp-section-body">{`Our primary purpose in collecting personal information is to provide you with a secure, smooth, efficient, and customized experience. We may use your information to:

• Verify your identity and enable access to our services
• Send transactional communications and respond to your queries
• Contact you via voice call, text, or email as authorized
• Advertise, promote, or market our products and services
• Comply with applicable laws and legal processes
• Detect, prevent or remedy any breach of our Terms
• Perform research and operational analysis
• Track user activity and behaviour patterns on the Site
• Protect the public interest or for official purposes if formally requested by any governmental authority`}</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">How We Share Your Information</h2>
            <p className="lp-section-body">We share information with our officers, employees, consultants, agents and third-party service providers who help us host and maintain the Site, and provide application development, storage, analytics, and marketing services. We do not permit third-party service providers to use your personal information for their own marketing purposes. We may also share your information to comply with applicable law, respond to legal processes, or to protect the rights, property or safety of us, our users, and the public.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">User Content</h2>
            <p className="lp-section-body">If you submit content to any interactive portion of the Site, your content may be made publicly available to anyone who visits that area of the Site. Other users or the general public may access or use content that you make publicly available. Even if you remove or delete your content, copies may remain in cached or archived areas of the Site.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Data Security &amp; Retention</h2>
            <p className="lp-section-body">Keeping your information secure is of great concern to us. Your personal information is maintained in electronic form with restricted access and appropriate security measures in place. We retain your personal information only for as long as necessary to fulfil the purposes we collected it for, including satisfying any legal, accounting, or reporting requirements. We may delete your information at any time without prior notice.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Children's Privacy</h2>
            <p className="lp-section-body">Our primary audience is adults and young adults. We do not knowingly collect personal information from children under the age of 10. Children under 10 are prohibited from using the Site without parent/guardian supervision. If you are under 18, it is mandatory that your parent or guardian has read and accepted this Privacy Policy on your behalf. If we learn we have collected information from a child under the age of 13, we will remove that information immediately.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Third Party Websites</h2>
            <p className="lp-section-body">The Site may contain links to third-party websites. We are not responsible for the content or privacy practices of other websites or services linked on our Site. We do not endorse or make any representations about third-party websites. The information you choose to provide to or that is collected by these third parties is not covered by our Privacy Policy. We strongly encourage you to read such third parties' privacy policies.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Changes to Privacy Policy</h2>
            <p className="lp-section-body">We reserve the right to update this Privacy Policy at any time, with or without advance notice. In the event there are significant changes in the way we treat user's personal information, we will display a notice on the Site or send users an email. Your continued access to the Site following the posting of changes to this Privacy Policy will mean you consent to and accept those changes.</p>
          </div>
          <hr className="lp-divider" />

          <div className="lp-section">
            <h2 className="lp-section-title">Contact &amp; Grievance Officer</h2>
            <p className="lp-section-body">{`Should you have questions about this Privacy Policy or our information practices, please contact our grievance officer:

Name: Shweta Kapoor
WhatsApp: +91 7039240054`}</p>
          </div>
        </div>

        <div className="lp-footer">
          © 2026 Shweta Kapoor &nbsp;·&nbsp; <a href="/privacy">Privacy Policy</a> &nbsp;·&nbsp; <a href="/terms">Terms of Use</a> &nbsp;·&nbsp; <a href="/refund">Refund Policy</a> &nbsp;·&nbsp; <a href="/contact">Contact</a>
        </div>
      </div>
    </>
  )
}