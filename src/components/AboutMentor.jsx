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
    <section className="section about-section">
      <div className="about-inner">
        <div className="about-text reveal-left">
          <div className="about-eyebrow">✦ Your Mentor</div>
          <h2 className="about-title">Meet Lavisha Arora</h2>
          <p>
            Hey there! I'm Lavisha Arora, your makeup mentor. With 7 years of experience as a
            professional makeup artist and educator, I've helped beauty lovers all across India master
            their makeup skills—and now, I'm here to help YOU!
          </p>
          <p>
            I know how frustrating it can be when makeup feels complicated. That's why I've spent
            years{' '}
            <span>breaking down complex techniques into easy, everyday steps</span> that anyone can
            follow. In this course, I'll teach you everything from the basics to trendy, stunning
            makeup looks—so you can feel beautiful in your own skin, every single day!
          </p>
          <p>
            Whether you're just starting out or looking to refine your skills, I've got you covered.
            Let's dive in together—I promise, it's going to be fun, exciting, and totally
            transformational!
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
                <CountUp target={7} suffix=" Yrs" />
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
            src="https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67c46ae9cd1050f709706c2c_frame_88m.webp"
            alt="Lavisha Arora"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}