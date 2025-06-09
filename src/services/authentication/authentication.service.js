import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDuZsXE10A0-9cy7wIYxyVg3dApf5_o258",
  authDomain: "mealsforyou-d1a77.firebaseapp.com",
  projectId: "mealsforyou-d1a77",
  storageBucket: "mealsforyou-d1a77.firebasestorage.app",
  messagingSenderId: "595776631693",
  appId: "1:595776631693:web:d9c4c89a0cc16772a903c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Login function
export const loginRequest = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerRequest = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
