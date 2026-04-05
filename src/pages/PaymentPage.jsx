import React, { useState, useEffect, useRef } from 'react';
import { Loader, XCircle } from 'lucide-react';
import './PaymentPage.css'
import PostPaymentForm from './PostPaymentForm'
import OrderConfirm from './OrderConfirm'
import { usePrice } from '../hooks/usePrice';
import clevertap from '../hooks/clevertap';
import { trackEvent, trackCustomEvent } from '../hooks/meta'
import { trackEvent as clarityTrackEvent, identifyUser as clarityIdentifyUser } from '../hooks/clarity'

const BACKEND_URL     = import.meta.env.REACT_APP_BACKEND_URL;
const RAZORPAY_KEY_ID = import.meta.env.REACT_APP_RAZORPAY_KEY_ID;


function PaymentPage({ onBackToHome } = {}) {
  const [formData, setFormData]               = useState({ name: '', email: '', phone: '', state: 'Karnataka' })
  const [paymentStatus, setPaymentStatus]     = useState(null)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [profileData, setProfileData]         = useState(null)
  const [loading, setLoading]                 = useState(false)
  const [couponOpen, setCouponOpen]           = useState(false)
  const [gstOpen, setGstOpen]                 = useState(false)
  const [couponCode, setCouponCode]           = useState('')
  const { coursePrice: courseAmount, originalPrice: originalAmount, pricingVariant, urgencyTest, urgencyVariant } = usePrice()
  const [razorpayOrderId, setRazorpayOrderId] = useState(null);
  const eventFiredRef = useRef(false);

  useEffect(() => {
    if (eventFiredRef.current) return;
    eventFiredRef.current = true;
    clevertap.event.push('payment_page_shown', {
      pricing_variant: `pricing_${courseAmount}`,
      urgency_variant: urgencyVariant,
    });
    clarityTrackEvent('payment_page_shown', {
      pricing_variant: `pricing_${courseAmount}`,
      urgency_variant: urgencyVariant,
    });
    trackEvent('ViewContent', {
      content_name: '3-Day Hairstyle Masterclass',
      value: courseAmount,
      currency: 'INR',
      pricing_variant: `pricing_${courseAmount}`,
    });
  }, [courseAmount]);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const handlePayment = async () => {
    if (!formData.phone) {
      alert('Please fill in your name and phone number')
      return
    }
    clevertap.event.push('Payment Initiated', {
      amount: courseAmount,
      pricing_variant: `pricing_${courseAmount}`,
      urgency_variant: urgencyVariant,
      phone: formData.phone,
      name: formData.name,
    })
    clarityTrackEvent('Payment Initiated', {
      amount: courseAmount,
      pricing_variant: `pricing_${courseAmount}`,
      urgency_variant: urgencyVariant,
      phone: formData.phone,
      name: formData.name,
    })
    trackEvent('InitiateCheckout', {
      value: courseAmount,
      currency: 'INR',
      num_items: 1,
      pricing_variant: `pricing_${courseAmount}`,
      phone: formData.phone,
      name: formData.name,
    })
    // Identify user in CleverTap at earliest moment (before any API calls)
    clevertap.onUserLogin.push({
      Site: {
        Name: formData.name,
        Email: formData.email || undefined,
        Phone: `+91${formData.phone}`,
        Identity: formData.phone,
      },
    })
    clarityIdentifyUser({
      name: formData.name,
      email: formData.email,
      phone: `+91${formData.phone}`,
    })
    setLoading(true)
    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        alert('Razorpay SDK failed to load. Please check your internet connection.')
        setLoading(false)
        return
      }

      const response = await fetch(`${BACKEND_URL}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:   formData.name,
          email:  formData.email || null,
          phone:  formData.phone,
          amount: courseAmount,
        }),
      })

      const data = await response.json()
      if (!data.success) {
        alert('Failed to create order. Please try again.')
        setLoading(false)
        return
      }

      setRazorpayOrderId(data.orderId)

      const options = {
        key:         RAZORPAY_KEY_ID,
        order_id:    data.orderId,
        name:        'Shweta Celeb Makeover',
        description: `Core Of Makeup — ₹${courseAmount}`,
        handler: async function (razorpayResponse) {
          const eventId = `purchase_${razorpayResponse.razorpay_order_id}`;
          try {
            await fetch(`${BACKEND_URL}/api/verify-payment`, {
              method:  'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id:   razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature:  razorpayResponse.razorpay_signature,
                event_id:            eventId,
              }),
            })
          } catch (err) {
            console.error('Payment verification error:', err)
          }

          clevertap.event.push('Payment Success', {
            amount: courseAmount,
            original_price: originalAmount,
            pricing_variant: `pricing_${courseAmount}`,
            urgency_variant: urgencyVariant,
            course_name: '3-Day Hairstyle Masterclass',
            razorpay_order_id: razorpayResponse.razorpay_order_id,
            phone: formData.phone,
            name: formData.name,
          });
          clarityTrackEvent('Payment Success', {
            amount: courseAmount,
            original_price: originalAmount,
            pricing_variant: `pricing_${courseAmount}`,
            urgency_variant: urgencyVariant,
            course_name: '3-Day Hairstyle Masterclass',
            razorpay_order_id: razorpayResponse.razorpay_order_id,
            phone: formData.phone,
            name: formData.name,
          });
          trackEvent('Purchase', {
            value: courseAmount,
            currency: 'INR',
            content_name: '3-Day Hairstyle Masterclass',
            original_price: originalAmount,
            pricing_variant: `pricing_${courseAmount}`,
            order_id: razorpayResponse.razorpay_order_id,
            phone: formData.phone,
            name: formData.name,
          }, { eventID: eventId });
                
          setPaymentStatus('success')
          setShowProfileForm(true)
        },
        prefill: { name: formData.name, email: formData.email || '', contact: formData.phone },
        theme: { color: '#17120e' },
        modal: {
          ondismiss: function () {
            clevertap.event.push('Payment Dismissed', { amount: courseAmount, pricing_variant: `pricing_${courseAmount}`, urgency_variant: urgencyVariant, name: formData.name, phone: formData.phone })
            clarityTrackEvent('Payment Dismissed', { amount: courseAmount, pricing_variant: `pricing_${courseAmount}`, urgency_variant: urgencyVariant, name: formData.name, phone: formData.phone })
            trackCustomEvent('Payment Dismissed', {
              value: courseAmount,
              pricing_variant: `pricing_${courseAmount}`,
              name: formData.name,
              phone: formData.phone,
            })
            setPaymentStatus('failed')
            setLoading(false)
          },
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
      setLoading(false)
    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to initiate payment. Please try again.')
      setLoading(false)
    }
  }

  // Step 3 – confirmation
  if (profileData) {
    return <OrderConfirm paymentData={formData} profileData={profileData} courseAmount={courseAmount} />
  }

  // Step 2 – profile form
  if (showProfileForm) {
    return (
      <div>
        <div style={{ minHeight: '100vh', background: '#f6f2ec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: '#b8912a', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, fontStyle: 'italic', opacity: 0.6 }}>
            Payment confirmed ✓
          </div>
        </div>
        <PostPaymentForm
          paymentData={formData}
          courseAmount={courseAmount}
          razorpayOrderId={razorpayOrderId}
          onComplete={(profile) => setProfileData(profile)}
        />
      </div>
    )
  }

  // Step 1 – failed state
  if (paymentStatus === 'failed') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f6f2ec',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}>
        <div style={{
          maxWidth: 380,
          width: '100%',
          background: '#fffefb',
          borderRadius: 16,
          padding: '44px 32px',
          textAlign: 'center',
          border: '1px solid #e2dbd0',
          boxShadow: '0 12px 40px rgba(23,18,14,0.12)',
        }}>
          <div style={{
            width: 68, height: 68,
            background: '#fef2f2',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            border: '1px solid #fecaca',
          }}>
            <XCircle size={36} style={{ color: '#c0392b' }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 28, fontWeight: 300,
            letterSpacing: '0.02em',
            marginBottom: 8,
            color: '#17120e',
          }}>
            Payment Failed
          </h2>
          <p style={{ fontSize: 13, color: '#7a6d64', marginBottom: 28, lineHeight: 1.6, fontWeight: 300 }}>
            Your payment could not be processed. Please try again.
          </p>
          <a
            href="/"
            style={{
              width: '100%', padding: '14px 20px',
              background: 'linear-gradient(135deg, #1f1710 0%, #3a2f27 50%, #2a1f16 100%)',
              color: '#d4aa4e',
              border: 'none', borderRadius: 8,
              fontSize: 14, fontWeight: 600,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              letterSpacing: '0.04em',
              cursor: 'pointer',
            }}
          >
            Try Again
          </a>
        </div>
      </div>
    )
  }

  const canPay = Boolean(formData.phone)

  const INDIAN_STATES = [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
    'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
    'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
    'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
    'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
  ]

  return (
    <div className="pp-page">
      
      <div className="pp-topbar">
        <a className="pp-back-btn" href="/">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </a>
        <div className="pp-brand-logo">Shweta Celeb<br />Makeover</div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="pp-content">
        <div className="pp-page-title">Payment details</div>
        <div className="pp-page-subtitle">Complete your purchase by providing your details below.</div>

        {/* Billing card */}
        <div className="pp-card">

          <div className="pp-field-divider" />

       

          <div className="pp-field-divider" />
          <div className="pp-input-row" data-clarity-unmask="true">
            <div className="pp-phone-flag-block">
              <span style={{ fontSize: 18, lineHeight: 1 }}>🇮🇳</span>
              <span className="pp-phone-code" data-clarity-unmask="true">+91</span>
              <span className="pp-phone-chevron" data-clarity-unmask="true">▾</span>
            </div>
            <div className="pp-phone-divider" data-clarity-unmask="true"/>
            <input className="pp-bare-input" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone number" data-clarity-unmask="true" />
          </div>        </div>

        {/* Coupon card */}
        {/* <div className="pp-card">
          <div className="pp-expandable-row" onClick={() => setCouponOpen(o => !o)}>
            <div className="pp-expandable-left">
              <div className="pp-row-icon">🏷</div>
              <span className="pp-expandable-label">Have a coupon?</span>
            </div>
            <div className="pp-plus-icon">{couponOpen ? '−' : '+'}</div>
          </div>
          {couponOpen && (
            <div className="pp-coupon-input-wrap">
              <input className="pp-coupon-input" placeholder="Enter coupon code" value={couponCode} onChange={e => setCouponCode(e.target.value)} />
              <button className="pp-coupon-apply">Apply</button>
            </div>
          )}
        </div> */}

        {/* Service + total card */}
        <div className="pp-card">
          <div className="pp-service-section">
            <div className="pp-service-line">
              <span className="pp-service-name">3-Day Hairstyle Masterclass</span>
              <div className="pp-service-prices">
                <span className="pp-disc-price" data-clarity-unmask="true">₹{courseAmount.toFixed(2)}</span>
                {urgencyTest && <span className="pp-orig-price" data-clarity-unmask="true">₹499.00</span>}
              </div>
            </div>
          </div>
          <div className="pp-amount-divider" />
          <div className="pp-total-line">
            <span className="pp-total-label">Amount to be paid</span>
            {urgencyTest ? (
              <span className="pp-total-values">
                <span className="pp-total-value" data-clarity-unmask="true">₹{courseAmount.toFixed(2)}</span>
                <span className="pp-total-orig" data-clarity-unmask="true">₹499.00</span>
              </span>
            ) : (
              <span className="pp-total-value" data-clarity-unmask="true">₹{courseAmount.toFixed(2)}</span>
            )}
          </div>
        </div>

      </div>

      {/* ── Sticky bottom bar ── */}
      <div className="pp-sticky-bar">
        <button
          type="button"
          className={`pp-proceed-btn${loading || !canPay ? ' is-disabled' : ''}`}
          onClick={handlePayment}
          disabled={loading || !canPay}
          data-clarity-unmask="true"
        >
          {loading
            ? <><Loader size={17} className="pp-spin" /> Processing…</>
            : <>Proceed to pay <strong data-clarity-unmask="true">₹{courseAmount}.00</strong></>
          }
        </button>
      </div>
    </div>
  )
}

export default PaymentPage;