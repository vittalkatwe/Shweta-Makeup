import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader, Shield, Clock, Wallet, RefreshCw, Zap } from 'lucide-react';
import './PaymentPage.css'

const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL;
const RAZORPAY_KEY_ID = import.meta.env.REACT_APP_RAZORPAY_KEY_ID;

function PaymentPage({ onBackToHome } = {}) {
  const [currentPage, setCurrentPage] = useState('checkout');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nextBillingDate, setNextBillingDate] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const redirectToOrderConfirm = () => {
    setTimeout(() => {
      window.location.href = "https://www.paisaalert.in/orderconfirm";
    }, 2000);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscriptionPayment = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill all the fields');
      return;
    }

    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        setLoading(false);
        return;
      }

      // Create one-time order
      const response = await fetch(`${BACKEND_URL}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
      });

      const data = await response.json();

      if (!data.success) {
        alert('Failed to create order. Please try again.');
        setLoading(false);
        return;
      }

      console.log('✅ Order created:', data.orderId);

      // Open Razorpay order checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        order_id: data.orderId,
        name: 'PaisaAlert',
        description: '₹499 Today',
        handler: async function (response) {
          console.log('✅ Payment successful!', response);
          
          setPaymentStatus('success');

          // Webhook will handle email sending
          redirectToOrderConfirm();
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#4C5FD5'
        },
        modal: {
          ondismiss: function() {
            console.log('⚠️ Payment modal dismissed');
            setPaymentStatus('failed');
            setLoading(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setLoading(false);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  if (currentPage === 'checkout' && !paymentStatus) {
    const canPay = Boolean(formData.name && formData.email && formData.phone)

    return (
      <div className="pp-page">
        <div className="pp-container">
          <div className="pp-grid">
            <div className="pp-left">
              <div className="pp-left-brand">LAVISHA AORRA</div>

              <h1 className="pp-course-title">Core Of Makeup</h1>
              <div className="pp-course-by">By Lavisha Arora</div>

              <div className="pp-price-row">
                <div className="pp-original-price">
                  <span className="pp-original-amount">₹4999</span>
                  <span className="pp-original-note">(inclusive of GST)</span>
                </div>
                <div className="pp-current-price">
                  <span className="pp-current-currency">₹</span>
                  499
                </div>
              </div>

              <div className="pp-course-banner" aria-hidden="true">
                <div className="pp-banner-text">
                  <div className="pp-banner-line1">Core of</div>
                  <div className="pp-banner-line2">Makeup</div>
                </div>
              </div>

              <div className="pp-course-copy">
                <p className="pp-course-paragraph">
                  Welcome to “Core of Makeup” Discover the Art of Flawless Makeup in One Course!
                </p>
                <p className="pp-course-paragraph">
                  <strong>Why Core of Makeup?</strong>
                </p>
                <p className="pp-course-paragraph">
                  The “Core of Makeup” course offers a deep dive into the world of beauty and makeup, crafted
                  especially for beginners who are passionate about mastering their art and becoming a pro.
                </p>
                <h3 className="pp-course-subheading">This is for you if you want to learn</h3>
                <p className="pp-course-paragraph">Enroll Now</p>
              </div>
            </div>

            <div className="pp-right">
              <div className="pp-right-header">
                <div className="pp-right-title">Payment details</div>
                <div className="pp-right-subtitle">
                  Complete your purchase by providing your payment details.
                </div>
              </div>

              <div className="pp-right-sticky">
                <div className="pp-panel">
                  <div className="pp-section-title">Billing information</div>

                  <div className="pp-form">
                    <input
                      className="pp-input"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                    />

                    <input
                      className="pp-input"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />

                    <div className="pp-phone-row">
                      <div className="pp-phone-prefix" aria-hidden="true">
                        <span className="pp-phone-flag" />
                        <span className="pp-phone-code">+91</span>
                      </div>
                      <input
                        className="pp-input pp-phone-input"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                      />
                    </div>

                    <select
                      className="pp-input pp-select"
                      name="state"
                      value={formData.state || 'Karnataka'}
                      onChange={handleInputChange}
                    >
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>

                  <div className="pp-coupon-row">
                    <span className="pp-coupon-label">Have a coupon?</span>
                    <button type="button" className="pp-plus-btn" aria-label="Add coupon">
                      +
                    </button>
                  </div>

                  <div className="pp-service-box">
                    <div className="pp-service-title">Service</div>
                    <div className="pp-service-name">Core Of Makeup</div>

                    <div className="pp-service-lines">
                      <div className="pp-service-line">
                        <span className="pp-service-muted">₹499</span>
                        <span className="pp-service-amount">₹499.00</span>
                      </div>
                      <div className="pp-service-line">
                        <span className="pp-service-muted">GST</span>
                        <span className="pp-service-amount">₹0.00</span>
                      </div>
                    </div>

                    <div className="pp-amount-row">
                      <span className="pp-amount-label">Amount to be paid :</span>
                      <span className="pp-amount-value">₹499.00</span>
                    </div>

                    <div className="pp-gst-accordion">
                      <div className="pp-gst-accordion-left">
                        <div className="pp-gst-accordion-title">Add GST (optional)</div>
                      </div>
                      <button type="button" className="pp-plus-btn pp-plus-btn-large" aria-label="Toggle GST">
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pp-sticky-cta">
                  <button
                    type="button"
                    className={`pp-proceed-btn ${loading || !canPay ? 'is-disabled' : ''}`}
                    onClick={handleSubscriptionPayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader size={18} className="pp-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Proceed to pay ₹499.00</>
                    )}
                  </button>

                  <div className="pp-pay-methods" aria-hidden="true">
                    <span className="pp-method pp-method-upi">UPI</span>
                    <span className="pp-method pp-method-paytm">Paytm</span>
                    <span className="pp-method pp-method-visa">VISA</span>
                    <span className="pp-method pp-method-rupay">RuPay</span>
                    <span className="pp-method pp-method-mastercard">Master</span>
                    <span className="pp-method pp-method-cards">Card</span>
                  </div>
                </div>
              </div>

              <div className="pp-footnote">
                <div className="pp-footnote-text">
                  By proceeding, you authorize ₹499 charge today.
                  <br />
                  One-time payment only. Secured by Razorpay.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#F5F5F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          background: 'white',
          borderRadius: '12px',
          padding: '50px 40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          {paymentStatus === 'success' ? (
            <>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#DEF7EC',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px'
              }}>
                <CheckCircle size={45} style={{ color: '#0E9F6E' }} />
              </div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                margin: '0 0 15px 0',
                color: '#333'
              }}>
                Payment Successful!
              </h2>
              <p style={{
                fontSize: '15px',
                color: '#6B7280',
                margin: '0 0 25px 0',
                lineHeight: '1.6'
              }}>
                ₹499 charged successfully. Your one-time access is now confirmed.
              </p>
              
              <div style={{
                background: '#F0F4FF',
                border: '2px solid #4C5FD5',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                textAlign: 'left'
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '5px' }}>
                    ✓ One-time payment
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                    ₹499 charged
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '5px' }}>
                    ✓ Access confirmed
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#FF9800' }}>
                    ₹499
                  </div>
                </div>
              </div>

              <div style={{
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '25px',
                textAlign: 'left'
              }}>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 5px 0' }}>
                  File sent to:
                </p>
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#333', margin: 0 }}>
                  {formData.email}
                </p>
              </div>
            </>
          ) : (
            <>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#FEE2E2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px'
              }}>
                <XCircle size={45} style={{ color: '#DC2626' }} />
              </div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                margin: '0 0 15px 0',
                color: '#333'
              }}>
                Payment Failed
              </h2>
              <p style={{
                fontSize: '15px',
                color: '#6B7280',
                margin: '0 0 30px 0',
                lineHeight: '1.6'
              }}>
                Your payment could not be processed. Please try again.
              </p>
            </>
          )}

          <button
            onClick={() => {
              setCurrentPage('checkout');
              setPaymentStatus(null);
              setFormData({ name: '', email: '', phone: '' });
              if (typeof onBackToHome === 'function') onBackToHome();
            }}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #4C5FD5 0%, #5B6FE8 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }
}

export default PaymentPage;