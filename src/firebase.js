import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhWUvdxs1TY-am-CWnaE23YwieF0ryTHo",
  authDomain: "blog-2d02f.firebaseapp.com",
  projectId: "blog-2d02f",
  storageBucket: "blog-2d02f.appspot.com",
  messagingSenderId: "692366699296",
  appId: "1:692366699296:web:be939dfc4a2bd972578545",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

window.firebase = firebase;

export const provider = new firebase.auth.GoogleAuthProvider();
export const signIn = () => auth.signInWithPopup(provider);
export default firebase;
