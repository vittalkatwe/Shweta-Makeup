import React from 'react'
import { useState, useEffect } from 'react';
import { remoteConfig, fetchAndActivate, getValue } from '../hooks/firebase';

const CHECKOUT_URL =
  '/?payment=1'

export default function StickyBar() {
  
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
    <div className="sticky-bar">
      <div>
        <div className="sticky-price">
          ₹{courseAmount}/-
        </div>
        <div className="sticky-offer-text">🌟 Limited-Time Offer</div>
      </div>
      <a href={CHECKOUT_URL} className="sticky-cta">
        🚀 Join Now
      </a>
    </div>
  )
}