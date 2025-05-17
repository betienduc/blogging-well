// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDulTOv2tYUDS2Y1yLGjolO1JTfb9WODmE",
  authDomain: "blogging-well.firebaseapp.com",
  projectId: "blogging-well",
  storageBucket: "blogging-well.firebasestorage.app",
  messagingSenderId: "893050440416",
  appId: "1:893050440416:web:51d07229b03e7a393f5e85",
  measurementId: "G-GZJ3F5XDSN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
