import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAK1yu8_3zaGFeZJhGqfyLyTXEEiGKCsuo",
  authDomain: "catch-of-the-day-lovely.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-lovely-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "catch-of-the-day-lovely",
  storageBucket: "catch-of-the-day-lovely.appspot.com",
  messagingSenderId: "660006895391",
  appId: "1:660006895391:web:779ebecf63a7367b127a2a"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
