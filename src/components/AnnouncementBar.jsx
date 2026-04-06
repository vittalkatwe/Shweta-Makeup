import React from 'react'
import { usePrice } from '../hooks/usePrice'

export default function AnnouncementBar() {
  const { coursePrice, urgencyTest } = usePrice()

  return (
    <div className="announcement-bar" data-clarity-unmask="True">
      {urgencyTest ? (
        <>
          ⚡ Limited Time Offer: Enroll at{' '}
          <strong data-clarity-unmask="True">₹{coursePrice}</strong>{' '}
          <span className="original-price" data-clarity-unmask="True">₹499</span>{' '}
        </>
      ) : (
        <>
          ⚡ Limited Time Offer:{' '}
          <strong data-clarity-unmask="True">Enroll at Rs. ₹{coursePrice}</strong>{' '}
        </>
      )}
    </div>
  )
}
