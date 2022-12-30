// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCWNUnrLLQZF8yU9FSe2ME8qK_p5jL8mZ8",
  authDomain: "my-second-project-9a537.firebaseapp.com",
  projectId: "my-second-project-9a537",
  storageBucket: "my-second-project-9a537.appspot.com",
  messagingSenderId: "381380381258",
  appId: "1:381380381258:web:98bebbe38205b9a854f4b3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);