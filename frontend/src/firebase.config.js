import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";

// Only initialize Firebase if all required config values are present
const hasFirebaseConfig = !!(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

let auth = null;
let googleProvider = null;

if (hasFirebaseConfig) {
  try {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    console.log("[Firebase] Initialized successfully.");
  } catch (e) {
    console.warn("[Firebase] Initialization failed:", e.message);
  }
} else {
  console.warn("[Firebase] Config not set. Google & Phone auth will use fallback mode.");
}

export { auth, googleProvider, RecaptchaVerifier };
export const isFirebaseEnabled = hasFirebaseConfig && !!auth;
