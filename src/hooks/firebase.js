// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";

// Your Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "shweta-makeover",
  storageBucket: "shweta-makeover.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Add Remote Config
const remoteConfig = getRemoteConfig(app);

// ⚠️ Important settings
remoteConfig.settings = {
  minimumFetchIntervalMillis: 0, // use 0 for development
};

function getDefaultDates() {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const base = new Date()
  base.setDate(base.getDate() + 3) // start from tomorrow

  const days = []
  const monthNames = new Set()
  for (let i = 0; i < 3; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    days.push(d.getDate())
    monthNames.add(months[d.getMonth()])
  }

  // If all in same month: "25, 26 & 27 April"
  // If spanning two months: "30, 31 May & 1 June" — handled in usePrice
  // For the default string we just store the start date + month info:
  const d1 = new Date(base)
  const d2 = new Date(base); d2.setDate(base.getDate() + 1)
  const d3 = new Date(base); d3.setDate(base.getDate() + 2)

  const fmt = (d) => `${d.getDate()} ${months[d.getMonth()]}`
  if (d1.getMonth() === d3.getMonth()) {
    return `${d1.getDate()}, ${d2.getDate()} & ${d3.getDate()} ${months[d1.getMonth()]}`
  } else if (d1.getMonth() === d2.getMonth()) {
    return `${d1.getDate()} & ${d2.getDate()} ${months[d1.getMonth()]} & ${d3.getDate()} ${months[d3.getMonth()]}`
  } else {
    return `${fmt(d1)}, ${fmt(d2)} & ${fmt(d3)}`
  }
}


// Optional: default values (fallback)
remoteConfig.defaultConfig = {
  course_price: "499",
  original_price: "999",
  pricing_variant: "default",
  urgency_test: "false",
  course_dates: getDefaultDates(),
};

// ✅ Export everything you need
export { remoteConfig, fetchAndActivate, getValue };