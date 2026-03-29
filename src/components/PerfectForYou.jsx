import React from 'react'
import { useState, useEffect } from 'react';
import { remoteConfig, fetchAndActivate, getValue } from '../hooks/firebase';

const CHECKOUT_URL =
  '/?payment=1'

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

const points = [
  'You know makeup, but can\'t do hairstyling confidently',
  'You run a beauty parlour and want to increase your income',
  'Clients ask for hairstyles, but you say no',
  'You want to take bridal and function bookings',
  'You want to start earning extra from home',
]

export default function PerfectForYou() {

  const [courseAmount, setCourseAmount] = useState(999);
  const [originalAmount, setOriginalAmount] = useState(999);
  const [pricingVariant, setPricingVariant] = useState("default");


  useEffect(() => {
    async function loadConfig() {
      try {
        // Fetch and activate Firebase Remote Config
        await fetchAndActivate(remoteConfig);

        // Get remote config values
        const price = getValue(remoteConfig, "course_price").asString();
        const original = getValue(remoteConfig, "original_price").asString();
        const variant = getValue(remoteConfig, "pricing_variant").asString();

        // Update state with defaults if values are missing
        setCourseAmount(Number(price) || 499);
        setOriginalAmount(Number(original) || 999);
        setPricingVariant(variant || "default");

      } catch (err) {
        console.error("Remote config error:", err);
        // fallback to default values
        setCourseAmount(499);
        setOriginalAmount(999);
        setPricingVariant("default");
      }
    }

    loadConfig();
  }, []); // run once on mount

  return (
    <section className="section perfect-section" data-section="perfect-for-you">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-title">This Masterclass is Perfect for You if</h2>
          <div className="section-divider section-divider-white" />
        </div>

        <div className="reveal" style={{ maxWidth: 680, margin: '0 auto' }}>
          <div className="solution-card">
            {points.map((p, i) => (
              <div className="card-item" key={i}><CheckIcon /><span>{p}</span></div>
            ))}
          </div>
        </div>

        {/* <div className="cta-center reveal">
          <a href={CHECKOUT_URL} className="cta-button">
            🚀 Join Now for <strong>₹{courseAmount}</strong>
            <span className="original">₹{originalAmount}</span>
          </a>
        </div> */}
      </div>
    </section>
  )
}