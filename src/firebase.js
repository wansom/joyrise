import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// firebase init - add your own config here
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTXVuZl2U4ireJDf4tqx7JLu3ZhGYkHi8",
  authDomain: "st-isaac.firebaseapp.com",
  projectId: "st-isaac",
  storageBucket: "st-isaac.appspot.com",
  messagingSenderId: "90532453150",
  appId: "1:90532453150:web:80ca9a9bcd9e656ec9470f",
  measurementId: "G-B3TVWPVD07"
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
  recordsCollection

};