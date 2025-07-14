// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOnZ_NxXY4iGmVW7jCu1z0kae-LcOajWY",
  authDomain: "ai-recruiter-a8ead.firebaseapp.com",
  projectId: "ai-recruiter-a8ead",
  storageBucket: "ai-recruiter-a8ead.firebasestorage.app",
  messagingSenderId: "137728457166",
  appId: "1:137728457166:web:34e11ec8a284d5e708939f",
  measurementId: "G-NR6Y4J158Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);