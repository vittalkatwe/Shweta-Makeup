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

// Optional: default values (fallback)
remoteConfig.defaultConfig = {
  course_price: "499",
  original_price: "999",
  pricing_variant: "default",
  urgency_test: "false",
};

// ✅ Export everything you need
export { remoteConfig, fetchAndActivate, getValue };