import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkC1K27VymJUy2ovbqhVXoi9EjrKuE0ag",
  authDomain: "task-management-51732.firebaseapp.com",
  projectId: "task-management-51732",
  storageBucket: "task-management-51732.firebasestorage.app",
  messagingSenderId: "606247166228",
  appId: "1:606247166228:web:7f75b8864c954beadf6201",
  measurementId: "G-8QJLN4LKFP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);