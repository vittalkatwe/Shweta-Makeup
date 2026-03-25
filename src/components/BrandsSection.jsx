import React from 'react'

const brands = [
  {
    alt: 'Brand 1',
    src: 'https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67bf13cb47aeff289cfa494e_download-removebg-preview.png',
  },
  {
    alt: 'Brand 2',
    src: 'https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67bf13cb254fa56cf212ca60_Mask%20group.png',
  },
  {
    alt: "L'Oreal",
    src: 'https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67bf13cc8ffbd8a9f7c45a1c_l-oreal-2-logo-png-transparent.png',
  },
  {
    alt: 'MAC Cosmetics',
    src: 'https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67bf13cc203772828ecbf063_MAC-Cosmetics-logo.png',
  },
  {
    alt: 'Maybelline',
    src: 'https://cdn.prod.website-files.com/63c91eab7b0fc1e7492b24b0/67bf13d0fce0ccaeb23049a6_Maybelline.png',
  },
]

export default function BrandsSection() {
  return (
    <div className="brands-section">
      <p className="brands-label">Worked with brands like</p>
      <div className="brands-row">
        {brands.map((b) => (
          <img key={b.alt} src={b.src} alt={b.alt} />
        ))}
      </div>
    </div>
  )
}
