import React from 'react'
import { useState, useEffect } from 'react';
import { remoteConfig, fetchAndActivate, getValue } from '../hooks/firebase';

const CHECKOUT_URL =
  '/?payment=1'

const audience = [
  { title: 'Working Professionals', desc: 'Look fresh and confident every day with quick and easy professional-looking makeup.', img: 'https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67004e6c952d7a2965be2d86_Working%20professional%20final.png' },
  { title: 'College Students', desc: 'Learn quick and easy makeup routines that fit your busy schedule. No more spending hours trying to get it right!', img: 'https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67004e6e952d7a2965be2ebd_College%20Goers%202%201%20(1).png' },
  { title: 'Beginners in Makeup', desc: "If you're just starting out, this course will make makeup simple and fun, guiding you step by step.", img: 'https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67004e6d952d7a2965be2e21_makeup%20lover.png' },
  { title: 'Content Creators & Influencers', desc: 'Be camera-ready anytime with techniques that make you look flawless on screen.', img: 'https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67004e6c952d7a2965be2e0d_creator%20pic.png' },
  { title: 'Makeup & Skincare Lovers', desc: 'Skip the guesswork! Learn what actually works for your skin and how to create looks that make you feel amazing.', img: 'https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67004e6d952d7a2965be2e48_New%20to%20makeup.png' },
  { title: 'Aspiring Makeup Artists', desc: 'Explore makeup as a career with a structured, affordable starting point before committing to professional training!', img: 'https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67004e6c952d7a2965be2deb_aspiring%20final.png' },
]

const delays = ['delay-1','delay-2','delay-3','delay-4','delay-5','delay-6']

export default function WhoShouldJoin() {

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
    <section className="section who-section">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-title">Who Should Join This Course?</h2>
          <div className="section-divider" />
        </div>

        <div className="who-grid">
          {audience.map((a, i) => (
            <div className={`who-card reveal-scale ${delays[i]}`} key={a.title}>
              <img src={a.img} alt={a.title} loading="lazy" />
              <div className="who-card-body">
                <div className="who-card-title">{a.title}</div>
                <p className="who-card-desc">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-center reveal">
          <a href={CHECKOUT_URL} className="cta-button">
            🚀 Join Now for <strong>₹{courseAmount}</strong>
          </a>
        </div>
      </div>
    </section>
  )
}