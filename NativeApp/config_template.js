import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  //   apiKey: ,
  //   authDomain: ,
  //   projectId: ,
  //   storageBucket: ,
  //   messagingSenderId: ,
  //   appId: ,
  //   measurementId:,
};

// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = firebase.auth.GoogleAuthProvider;

export const firestore = firebase.firestore();
export const storage = firebase.storage().ref();
export const TIMESTAMP = firebase.firestore.Timestamp;

// export const CLIENT_ID = ""
// export const ANDROID_CLIENT_ID = "";
