import React from 'react'

export default function AnnouncementBar({ coursePrice }) {
  return (
    <div className="announcement-bar">
      ⚡ Limited Time Offer:{' '}
      <strong>Enroll at Rs. ₹{coursePrice}</strong>{' '}
    </div>
  )
}