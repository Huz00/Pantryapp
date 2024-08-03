// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDLNUE3X3SeCft4A6HDJ0zjKoCtpvzOFg",
  authDomain: "pantryapp-f37f2.firebaseapp.com",
  projectId: "pantryapp-f37f2",
  storageBucket: "pantryapp-f37f2.appspot.com",
  messagingSenderId: "290620752177",
  appId: "1:290620752177:web:e5a22f1917e6bc27a2b010",
};

// Initialize Firebase.

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const auth = getAuth(app);
export { firestore, auth}