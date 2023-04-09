import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBWBhmcFY8BPrxSBSlsrw3Zb5S7xzzbnk",
  authDomain: "testing-25165.firebaseapp.com",
  projectId: "testing-25165",
  storageBucket: "testing-25165.appspot.com",
  messagingSenderId: "96041052154",
  appId: "1:96041052154:web:dc828d6f1c037b53dda643",
  measurementId: "G-GT3QJW7JRT",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRef = collection(db, "Games");

export { db, auth, colRef };
