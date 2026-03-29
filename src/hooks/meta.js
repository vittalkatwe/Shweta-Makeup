// Wraps window.fbq with safety checks. Standard Meta events use fbq('track'),
// custom events use fbq('trackCustom').
export function trackEvent(eventName, params) {
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, params)
  }
}

export function trackCustomEvent(eventName, params) {
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params)
  }
}
