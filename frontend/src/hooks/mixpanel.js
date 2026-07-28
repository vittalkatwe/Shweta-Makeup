// Mixpanel is loaded via npm package; init runs once at module load.
// API mirrors src/hooks/clarity.js so the call sites stay symmetrical.
// All calls are no-ops if the SDK fails to initialize (missing token, blocker, etc.).
import mixpanel from 'mixpanel-browser'

const MIXPANEL_TOKEN = '026410a8af4d9d9acfcfd60900145b2e'
let initialized = false

try {
  mixpanel.init(MIXPANEL_TOKEN, {
    track_pageview: false,
    persistence: 'localStorage',
    ignore_dnt: true,
  })
  initialized = true
} catch (e) {
  // ignore
}

const ready = () => initialized

export function trackEvent(eventName, properties = {}) {
  if (!ready()) return
  try {
    mixpanel.track(eventName, properties)
  } catch (e) {
    // ignore
  }
}

export function identifyUser({ name, email, phone } = {}) {
  if (!ready()) return
  const distinctId = phone || email
  if (!distinctId) return
  try {
    mixpanel.identify(distinctId)
    mixpanel.people.set({
      $name: name,
      $email: email,
      $phone: phone,
      name,
      email,
      phone,
    })
  } catch (e) {
    // ignore
  }
}

export function setProfile(properties = {}) {
  if (!ready()) return
  try {
    mixpanel.people.set(properties)
  } catch (e) {
    // ignore
  }
}

export function reset() {
  if (!ready()) return
  try {
    mixpanel.reset()
  } catch (e) {
    // ignore
  }
}
