import React from 'react'
import clevertap from '../hooks/clevertap'
import { useState, useEffect } from 'react';
import { remoteConfig, fetchAndActivate, getValue } from '../hooks/firebase';

const CHECKOUT_URL =
  '/?payment=1'

export default function Certificate() {

  const [courseAmount, setCourseAmount] = useState(5000);
  const [originalAmount, setOriginalAmount] = useState(5000);
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
    <section className="section certificate-section">
      <div className="section-inner" style={{ textAlign: 'center' }}>
        <div className="reveal">
          <h2 className="section-title">Get Certified!</h2>
          <div className="section-divider section-divider-white" />
        </div>

        <div className="certificate-frame reveal-scale">
          <img
            src="https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/certificate-shweta-makeover.jpeg"
            alt="Course Certificate"
            loading="lazy"
          />
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