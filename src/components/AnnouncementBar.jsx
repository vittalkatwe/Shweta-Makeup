import { useState, useEffect } from 'react';
import React from 'react'

import { remoteConfig, fetchAndActivate, getValue } from '../hooks/firebase';

export default function AnnouncementBar() {


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
    <div className="announcement-bar" data-clarity-unmask="True">
      ⚡ Limited Time Offer:{' '}
      <strong data-clarity-unmask="True">Enroll at Rs. ₹{courseAmount}</strong>{' '}
    </div>
  )
}