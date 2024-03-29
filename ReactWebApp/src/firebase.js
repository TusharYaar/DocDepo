import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_FIREBASE_APP_MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export const Database = {
  DOCSDEPO: firestore.collection("docsDepo"),
  NOTESDEPO: firestore.collection("notesDepo"),
  USERS: firestore.collection("users"),
  FEEDBACKS: firestore.collection("feedbacks"),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
  STORAGE: storage,
};
export const TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp;
export const Providers = {
  google: new firebase.auth.GoogleAuthProvider(),
};
export default firebaseConfig;
