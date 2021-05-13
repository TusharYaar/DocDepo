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
  measurementId: process.env.REACT_FIREBASE_APP_MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export const Database = {
  fileDepo: firestore.collection('fileDepo'),
  textDepo: firestore.collection('textDepo'),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
  arrayUnion: firebase.firestore.FieldValue.arrayUnion,
  arrayRemove: firebase.firestore.FieldValue.arrayRemove,
  storage: storage,
  timestamp: firebase.firestore.FieldValue.timestamp,
}
export const Providers = {
  google: new firebase.auth.GoogleAuthProvider(),
}
export default firebaseConfig;