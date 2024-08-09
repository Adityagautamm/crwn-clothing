// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

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
console.log("This is Auth", auth);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

objectsToAdd.forEach((object) => {
  const docRef= doc(collectionRef, object.title.toLowerCase())
  batch.set(docRef, object)
});
await batch.commit();
console.log('done');
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionInformation
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  console.log("does the user exist:", userSnapshot.exists());
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const getCategoriesAndDocuments = async() =>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) =>{
const { title, items } = docSnapshot.data();
acc[title.toLowerCase()]= items;
return acc
  }, {});

  return categoryMap;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  console.log("This is Auth", auth);
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
