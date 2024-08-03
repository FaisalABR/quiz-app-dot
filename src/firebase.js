import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-auth-tutorial-f29d2.firebaseapp.com",
  projectId: "react-auth-tutorial-f29d2",
  storageBucket: "react-auth-tutorial-f29d2.appspot.com",
  messagingSenderId: "174264995425",
  appId: "1:174264995425:web:18d5c86bb653b1ef366420",
  measurementId: "G-CWTY3E309M",
};

console.log(firebaseConfig.apiKey);

const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app);
