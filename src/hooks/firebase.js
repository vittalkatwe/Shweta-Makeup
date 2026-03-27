// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD5nbQKzKksks345VwK1hf823gVTlJ-08A",
  authDomain: "shweta-makeover.firebaseapp.com",
  projectId: "shweta-makeover",
  storageBucket: "shweta-makeover.firebasestorage.app",
  messagingSenderId: "2721051979",
  appId: "1:2721051979:web:cc91e7d8cf0efebeaa24ce",
  measurementId: "G-BRXB3T50XX"
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
};

// ✅ Export everything you need
export { remoteConfig, fetchAndActivate, getValue };