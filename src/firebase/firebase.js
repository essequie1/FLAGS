import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAntUHg07qdB14mHC2Db2V0dC-tk8n-aVU",
  authDomain: "flags-5a5da.firebaseapp.com",
  projectId: "flags-5a5da",
  storageBucket: "flags-5a5da.appspot.com",
  messagingSenderId: "959128994493",
  appId: "1:959128994493:web:8e7771061083e01c81edd4",
  measurementId: "G-1VZKR82LN3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
