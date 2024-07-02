// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3QXar7UyecOqEUiXu2fUDBolzOOl3yAc",
  authDomain: "crwn-clothing-db-13cff.firebaseapp.com",
  projectId: "crwn-clothing-db-13cff",
  storageBucket: "crwn-clothing-db-13cff.appspot.com",
  messagingSenderId: "565836887064",
  appId: "1:565836887064:web:cadbd0b72e7d6e79ecff6d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
