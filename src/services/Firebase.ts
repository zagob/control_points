import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  query,
  getDoc,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIND,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);

export {
  auth,
  app,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  db,
  addDoc,
  query,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  getDoc,
  collection,
};
