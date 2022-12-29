// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF8KE7dZEE9-25X2S344Y9vMxBbsuL5qE",
  authDomain: "newproject-95e39.firebaseapp.com",
  projectId: "newproject-95e39",
  storageBucket: "newproject-95e39.appspot.com",
  messagingSenderId: "108391869448",
  appId: "1:108391869448:web:fbf88e048f03451606b5bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);