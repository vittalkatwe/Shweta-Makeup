import React, { createContext, useContext, useEffect, useState } from 'react'
import { remoteConfig, fetchAndActivate, getValue } from './firebase'

const PriceContext = createContext(null)

export function PriceProvider({ children }) {
  const [coursePrice, setCoursePrice] = useState(Number(remoteConfig.defaultConfig.course_price) || 499)
  const [originalPrice, setOriginalPrice] = useState(Number(remoteConfig.defaultConfig.original_price) || 999)
  const [pricingVariant, setPricingVariant] = useState(remoteConfig.defaultConfig.pricing_variant || 'default')
  const [urgencyTest, setUrgencyTest] = useState(remoteConfig.defaultConfig.urgency_test === "true")
  const [courseDates, setCourseDates] = useState(remoteConfig.defaultConfig.course_dates)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        await fetchAndActivate(remoteConfig)
        if (cancelled) return
        const price = getValue(remoteConfig, 'course_price').asString()
        const original = getValue(remoteConfig, 'original_price').asString()
        const variant = getValue(remoteConfig, 'pricing_variant').asString()
        const urgency = getValue(remoteConfig, 'urgency_test').asString()
        const dates = getValue(remoteConfig, 'course_dates').asString()
        setCoursePrice(Number(price) || 499)
        setOriginalPrice(Number(original) || 999)
        setPricingVariant(variant || 'default')
        setUrgencyTest(urgency === "true")
        setCourseDates(dates || remoteConfig.defaultConfig.course_dates)
      } catch (err) {
        console.error('Remote config error:', err)
        setUrgencyTest(false)
      } finally {
        if (!cancelled) setReady(true)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const urgencyVariant = urgencyTest ? 'enabled' : 'disabled'

  return (
    <PriceContext.Provider value={{ coursePrice, originalPrice, pricingVariant, urgencyTest, urgencyVariant, courseDates, ready }}>
      {children}
    </PriceContext.Provider>
  )
}

export function usePrice() {
  const ctx = useContext(PriceContext)
  if (!ctx) {
    throw new Error('usePrice must be used within a PriceProvider')
  }
  return ctx
}
