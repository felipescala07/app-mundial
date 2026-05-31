import { initializeApp } from "firebase/app";

import {
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKOl5CNnoMeImcMWbTBvNHUwLgOLw1Clo",
  authDomain: "appmundial-50677.firebaseapp.com",
  projectId: "appmundial-50677",
  storageBucket: "appmundial-50677.firebasestorage.app",
  messagingSenderId: "351564458584",
  appId: "1:351564458584:web:fcc9b2c4125dc2b340782d"
};

export const app =
initializeApp(
  firebaseConfig
);

export const db =
getFirestore(app);