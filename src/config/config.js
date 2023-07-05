import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Firebase Config
var firebaseConfig = {
  apiKey: "AIzaSyBcJU9hTi2xxVQoIHY3hN3KinRF4PtT_aU",
  authDomain: "block-fund.firebaseapp.com",
  projectId: "block-fund",
  storageBucket: "block-fund.appspot.com",
  messagingSenderId: "1031084058583",
  appId: "1:1031084058583:web:a96f56184762dcc8aacd92",
  measurementId: "G-DCBZDBSWTN",
};

// Initializing Firebase App
firebase.initializeApp(firebaseConfig);

export const GoogleFirebase = firebase;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
