// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqG49L8y-3MNVbHAzSxzs_g5jbbeHbGI4",
  authDomain: "foco-taf.firebaseapp.com",
  projectId: "foco-taf",
  storageBucket: "foco-taf.appbasestorage.app",
  messagingSenderId: "636118907288",
  appId: "1:636118907288:web:a8f992bedb144185a793ed"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };