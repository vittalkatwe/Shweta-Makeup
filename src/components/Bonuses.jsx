import React from 'react'
import clevertap from '../hooks/clevertap'
import { useState, useEffect } from 'react'
import { remoteConfig, fetchAndActivate, getValue } from '../hooks/firebase';

const CHECKOUT_URL =
  '/payment'

const bonuses = [
  { badge: 'BONUS 1', title: '📖 Easy to Follow Chapter Notes' },
  { badge: 'BONUS 2', title: '🛒 Product Purchase Guide (seller details)' },
]

const delays = ['delay-1', 'delay-2']

export default function Bonuses() {


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
    <section className="section bonus-section" data-section="bonuses">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-title">🎁 ₹10,000 Worth of Exclusive Bonuses with this Course</h2>
          <div className="section-divider" />
        </div>

        <div className="bonus-grid">
          {bonuses.map((b, i) => (
            <div className={`bonus-card reveal-scale ${delays[i]}`} key={b.badge}>
              <div className="bonus-badge">{b.badge}</div>
              <div className="bonus-content">
                <div className="bonus-content-title">{b.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-center reveal" data-clarity-unmask="True">
          <a href={CHECKOUT_URL} className="cta-button" data-clarity-unmask="True">
            🚀 Join Now for <strong data-clarity-unmask="True">₹{courseAmount}</strong>
          </a>
        </div>
      </div>
    </section>
  )
}