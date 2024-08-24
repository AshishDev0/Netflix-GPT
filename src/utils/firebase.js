// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUDMfqnfTH8zLl1ymCTaLK8eScn7MDNbY",
  authDomain: "netflixgpt-1cc52.firebaseapp.com",
  projectId: "netflixgpt-1cc52",
  storageBucket: "netflixgpt-1cc52.appspot.com",
  messagingSenderId: "204246855493",
  appId: "1:204246855493:web:eda865c1f8257a116cd82c",
  measurementId: "G-E5QRR8BEXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();