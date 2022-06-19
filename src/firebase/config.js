// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2Y27tzLlEVCheTf8BYUh0G6dDlO4E-qM",
  authDomain: "fastlearningdb-56155.firebaseapp.com",
  projectId: "fastlearningdb-56155",
  storageBucket: "fastlearningdb-56155.appspot.com",
  messagingSenderId: "484858255113",
  appId: "1:484858255113:web:ffd31039cabdce775be5d8"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

//funciones de auth
export const firebaseAuth = getAuth( firebaseApp );

//bd
export const firebaseDB = getFirestore( firebaseApp );