import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// firebase init - add your own config here
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-9l0-8u1VoAMpYMvWgkXYVdEOn2S33xs",
  authDomain: "billarito-fbb9d.firebaseapp.com",
  projectId: "billarito-fbb9d",
  storageBucket: "billarito-fbb9d.appspot.com",
  messagingSenderId: "313117125345",
  appId: "1:313117125345:web:9bdf8baa21eef973d0a5a0",
  measurementId: "G-ZHBZP6SP7X"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const types = firebase.firestore;

const images = firebase.firestore.FieldValue.arrayUnion();

// collection references
const usersCollection = db.collection("users");
const studentCollection = db.collection("students");
const gradesCollection = db.collection("classes");
const feesCollection = db.collection("fees");
const recordsCollection = db.collection("records");
const tempfees = db.collection("tempfees");
const candidatesCollection = db.collection("candidates");



// export utils/refs

export {
  db,
  auth,
  storage,
  types,
  images,
  usersCollection,
  studentCollection,
  gradesCollection,
  feesCollection,
  recordsCollection,
  tempfees,
  candidatesCollection

};