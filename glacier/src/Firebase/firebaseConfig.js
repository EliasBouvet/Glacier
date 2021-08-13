import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQ06ZK2BFVpLlXiwqt_0_MlN6EwsbZdo8",
  authDomain: "innafjord-glacier.firebaseapp.com",
  projectId: "innafjord-glacier",
  storageBucket: "innafjord-glacier.appspot.com",
  messagingSenderId: "788886844740",
  appId: "1:788886844740:web:8406d66d83ce0049b79311",
  measurementId: "G-R00QGJG0FR",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
