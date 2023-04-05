import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import 'firebase/compat/firestore';
/*
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
*/

const firebaseConfig = {
  apiKey: "AIzaSyAkgX9DL6x3vV0mm_W5jAG-xamhdUTlgR4",
  authDomain: "versareceitas.firebaseapp.com",
  projectId: "versareceitas",
  storageBucket: "versareceitas.appspot.com",
  messagingSenderId: "60165998189",
  appId: "1:60165998189:web:67f674edfc46ce416be164"
};

/*
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore()
const auth = firebase.auth()
export {firebase,db,app,auth}
*/

export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = app.firestore()
export {db}