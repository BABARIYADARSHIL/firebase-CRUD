import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDr3dsCzsEyHdUFJEpvmmLwJqDVEeQBJ_A",
  authDomain: "fir-app-3a47b.firebaseapp.com",
  projectId: "fir-app-3a47b",
  storageBucket: "fir-app-3a47b.appspot.com",
  messagingSenderId: "569688776273",
  appId: "1:569688776273:web:05b6bc328fbc288d65a270",
  measurementId: "G-4MGG2PVFFC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebasestore = getFirestore(app);
