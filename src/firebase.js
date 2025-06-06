// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx4dnd-J8D25r4GT9JCN3n5HF4WI8UPw4",
  authDomain: "momsbirds-9670f.firebaseapp.com",
  projectId: "momsbirds-9670f",
  storageBucket: "momsbirds-9670f.firebasestorage.app",
  messagingSenderId: "989482360711",
  appId: "1:989482360711:web:a51fcc5caaa77044d33d22"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
