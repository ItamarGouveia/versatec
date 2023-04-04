import "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkgX9DL6x3vV0mm_W5jAG-xamhdUTlgR4",
  authDomain: "versareceitas.firebaseapp.com",
  projectId: "versareceitas",
  storageBucket: "versareceitas.appspot.com",
  messagingSenderId: "60165998189",
  appId: "1:60165998189:web:67f674edfc46ce416be164"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
export {db}