import React, { useState, useEffect, useRef } from 'react'
import clevertap from '../hooks/clevertap'

const CHECKOUT_URL =
  '/?payment=1'

const testimonials = [
  { id: 'g6q8duc53k', title: 'TM 1', thumb: 'https://embed-ssl.wistia.com/deliveries/d21c92a11846e79722cee868c59fa29a1d243c20.jpg?image_crop_resized=720x720' },
  { id: 'ymv0bvh7vf', title: 'TM 2', thumb: 'https://embed-ssl.wistia.com/deliveries/b574eed17602e379c568c49bd7b026cde688bc10.jpg?image_crop_resized=720x720' },
  { id: 'gt3iohh5w6', title: 'TM 3', thumb: 'https://embed-ssl.wistia.com/deliveries/50ed3f6100059b85bccde13d9c5d8e150a2301e5.jpg?image_crop_resized=720x720' },
  { id: '9m05zuwnlb', title: 'TM 4', thumb: 'https://embed-ssl.wistia.com/deliveries/f7243fd3b762015c3eedfcb38e8892306391e94e.jpg?image_crop_resized=720x720' },
  { id: 'icog200hyc', title: 'TM 5', thumb: 'https://embed-ssl.wistia.com/deliveries/0e25e1387f3ef5695a1ff7701876f7ecec1a9165.jpg?image_crop_resized=720x720' },
  { id: 'drkxrywi9d', title: 'TM 6', thumb: 'https://embed-ssl.wistia.com/deliveries/f71aa2fbed7707a1c3ec27ca8f884e7b686e6ac4.jpg?image_crop_resized=720x720' },
]

export default function Testimonials({ coursePrice }) {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef(null)

  const goTo = (i) => {
    if (i === current) return
    setFading(true)
    setTimeout(() => {
      setCurrent(i)
      setFading(false)
    }, 300)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length)
        setFading(false)
      }, 300)
    }, 4500)
    return () => clearInterval(timerRef.current)
  }, [])

  const t = testimonials[current]

  return (
    <section className="section testimonials-section">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-title">Student Feedback</h2>
          <div className="section-divider section-divider-white" />
        </div>

        <div className="slider-container reveal-scale">
          <div
            style={{
              opacity: fading ? 0 : 1,
              transform: fading ? 'scale(0.97)' : 'scale(1)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            <div className="slide-video-wrapper">
              <iframe
                key={t.id}
                src={`//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Ffast.wistia.net%2Fembed%2Fiframe%2F${t.id}&display_name=Wistia%2C+Inc.&url=https%3A%2F%2Flavishawebflow.wistia.com%2Fmedias%2F${t.id}&image=${encodeURIComponent(t.thumb)}&type=text%2Fhtml&schema=wistia`}
                width="940"
                height="940"
                scrolling="no"
                allowFullScreen
                title={t.title}
              />
            </div>
          </div>

          <div className="slider-nav">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`slider-dot${i === current ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="cta-center reveal">
          <a href={CHECKOUT_URL} className="cta-button" onClick={() => clevertap.event.push('homepage_cta_clicked', { section: 'testimonials', pricing_variant: `pricing_${coursePrice}` })}>
            🚀 Join Now for <strong>₹{coursePrice}</strong>
          </a>
        </div>
      </div>
    </section>
  )
}