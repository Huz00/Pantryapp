// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "process.env.AIzaSyCDLNUE3X3SeCft4A6HDJ0zjKoCtpvzOFg",
  authDomain: "process.env.pantryapp-f37f2.firebaseapp.com",
  projectId: "process.env.pantryapp-f37f2",
  storageBucket: "process.env.pantryapp-f37f2.appspot.com",
  messagingSenderId: "process.env.290620752177",
  appId: "process.env.1:290620752177:web:e5a22f1917e6bc27a2b010"
};

// Initialize Firebase.

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export { firestore}