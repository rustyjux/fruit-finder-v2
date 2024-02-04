// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// import { getDatabase } from "firebase/database";

// TODO: Add more SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseApiKey = process.env.FIREBASE_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "fruitfinder-fd94b.firebaseapp.com",
  databaseURL: "https://fruitfinder-fd94b-default-rtdb.firebaseio.com",
  projectId: "fruitfinder-fd94b",
  storageBucket: "fruitfinder-fd94b.appspot.com",
  messagingSenderId: "116443698159",
  appId: "1:116443698159:web:8fae52a3e5d601f1159c1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
