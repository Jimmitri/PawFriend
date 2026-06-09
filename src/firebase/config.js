import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxDJ5wMyZjpSs3IbM2nzE7AFkq4z7adic",
  authDomain: "pawfriend-29ac1.firebaseapp.com",
  projectId: "pawfriend-29ac1",
  storageBucket: "pawfriend-29ac1.firebasestorage.app",
  messagingSenderId: "551776817474",
  appId: "1:551776817474:web:4f6b838a1eb56db31138db"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);