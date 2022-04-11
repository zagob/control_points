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
  apiKey: "AIzaSyAs2rAO7tOOR21Ijk8hyYocU5gXwmsHlbE",
  authDomain: "control-points.firebaseapp.com",
  projectId: "control-points",
  storageBucket: "control-points.appspot.com",
  messagingSenderId: "331056463861",
  appId: "1:331056463861:web:f4926d117461e4b5fc6abc",
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
