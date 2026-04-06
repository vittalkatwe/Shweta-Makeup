// Microsoft Clarity is initialized via CDN snippet in index.html.
// These helpers mirror the CleverTap event/profile calls into Clarity so the
// same funnel data is visible in Clarity's dashboard. All calls are no-ops
// if window.clarity is unavailable (ad blockers, SSR, etc.).

const hasClarity = () => typeof window !== 'undefined' && typeof window.clarity === 'function'

const setTag = (key, value) => {
  if (value === undefined || value === null) return
  try {
    window.clarity('set', key, String(value))
  } catch (e) {
    // ignore
  }
}

export function trackEvent(eventName, properties = {}) {
  if (!hasClarity()) return
  try {
    window.clarity('event', eventName)
  } catch (e) {
    // ignore
  }
  Object.keys(properties).forEach((key) => {
    setTag(key, properties[key])
  })
}

export function identifyUser({ name, email, phone } = {}) {
  if (!hasClarity()) return
  try {
    window.clarity('identify', phone || email, undefined, undefined, name)
  } catch (e) {
    // ignore
  }
  setTag('email', email)
  setTag('phone', phone)
  setTag('name', name)
}

export function setProfile(properties = {}) {
  if (!hasClarity()) return
  Object.keys(properties).forEach((key) => {
    setTag(key, properties[key])
  })
}
