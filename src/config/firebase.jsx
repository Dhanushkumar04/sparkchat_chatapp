// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoigx9MmvkQBdkO3D8sFfD4S0fQxN9Lnc",
  authDomain: "chat-app-cb5bc.firebaseapp.com",
  projectId: "chat-app-cb5bc",
  storageBucket: "chat-app-cb5bc.firebasestorage.app",
  messagingSenderId: "671796170866",
  appId: "1:671796170866:web:61b925f65a67d37ffb72eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
