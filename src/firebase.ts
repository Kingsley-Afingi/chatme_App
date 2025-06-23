// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics} from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXTT1yQNMaA2_URYpUf6hVmYjX38v3ths",
  authDomain: "chatme-app-931a7.firebaseapp.com",
  projectId: "chatme-app-931a7",
  storageBucket: "chatme-app-931a7.firebasestorage.app",
  messagingSenderId: "1001376538290",
  appId: "1:1001376538290:web:1d2c50217072633b9673ab",
  measurementId: "G-70R6RCFNZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);