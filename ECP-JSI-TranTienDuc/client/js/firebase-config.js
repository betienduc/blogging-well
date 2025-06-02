import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDulTOv2tYUDS2Y1yLGjolO1JTfb9WODmE",
  authDomain: "blogging-well.firebaseapp.com",
  projectId: "blogging-well",
  storageBucket: "blogging-well.firebasestorage.app",
  messagingSenderId: "893050440416",
  appId: "1:893050440416:web:51d07229b03e7a393f5e85",
  measurementId: "G-GZJ3F5XDSN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export {
  app,
  auth,
  db,
  googleProvider,
  // Auth functions
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
  signOut,
  // Firestore
  setDoc,
  doc,
};
