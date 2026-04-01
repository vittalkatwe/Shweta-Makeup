import React, { useEffect, useRef, useState } from 'react'

function CountUp({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let start = 0
          const duration = 1800
          const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setVal(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
            else setVal(target)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

export default function AboutMentor() {
  return (
    <section className="section about-section" data-section="about-mentor">
      <div className="about-inner">
        <div className="about-text reveal-left">
          <div className="about-eyebrow">✦ Your Mentor</div>
          <h2 className="about-title">Meet Shweta Kapoor</h2>
          <p>
          Hi, I’m Shweta Kapoor — your hairstyling mentor. I have 13 years of experience as a makeup artist and teacher, and I’ve worked with many artists across India, especially from tier 2 and tier 3 cities who run their own parlours or work as freelancers. I understand your daily work, your clients, and your goal to grow in this field.
          </p>
          <p>
          Many times, we are good at makeup but feel stuck when it comes to hairstyling. Because of this, we may miss out on giving complete services to our clients. That’s why I’ve made this course in a very simple way, where I teach hairstyling step by step so you can easily learn and use it in your real work.
          </p>
          <p>
          In this course, you will learn basic to trendy hairstyles that you can do for bridal and party clients. This will help you increase your income, build confidence, and offer full services to your clients. Let’s learn together and grow your skills in an easy and practical way.
          </p>

          <div className="about-stat-row">
            <div className="about-stat">
              <span className="about-stat-number">
                <CountUp target={400} suffix="K+" />
              </span>
              <div className="about-stat-label">Students Taught</div>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">
                <CountUp target={13} suffix=" Yrs" />
              </span>
              <div className="about-stat-label">Experience</div>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">
                <CountUp target={16} suffix="+" />
              </span>
              <div className="about-stat-label">Lessons</div>
            </div>
          </div>
        </div>

        <div className="about-img-wrapper reveal-right">
          <img
            src="https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/social-image.jpeg"
            alt="Shweta Celeb Makeover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}