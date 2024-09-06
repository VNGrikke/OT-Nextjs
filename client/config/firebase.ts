// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXHYg2CkwB77TurpZ4zdQerBgxkZxhW9E",
  authDomain: "e-exam-6839e.firebaseapp.com",
  projectId: "e-exam-6839e",
  storageBucket: "e-exam-6839e.appspot.com",
  messagingSenderId: "46491245303",
  appId: "1:46491245303:web:1b2359e01794a1a58951f2",
  measurementId: "G-RBZ3GT5WS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);