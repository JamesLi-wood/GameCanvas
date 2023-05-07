import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4lC-SE1ArPoSyrUP6lXu1x8d1Afu0mOY",
  authDomain: "gamecanv.firebaseapp.com",
  projectId: "gamecanv",
  storageBucket: "gamecanv.appspot.com",
  messagingSenderId: "556546439209",
  appId: "1:556546439209:web:3f9c9797d0d52da9558438",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const gameRef = collection(db, "Games");
const userRef = collection(db, "Users");

export { db, gameRef, userRef };
