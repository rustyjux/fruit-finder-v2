import { initializeApp } from "firebase/app";
import { getAuth, signOut, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import { getDatabase } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

// App Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export function signOutUser () {
  console.log('Sign out successful')
  signOut(auth)
} 

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
