// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk3-KkhpTWtm3yfrJxkIXyq9roFWX7BXU",
  authDomain: "unips-2530c.firebaseapp.com",
  projectId: "unips-2530c",
  storageBucket: "unips-2530c.appspot.com",
  messagingSenderId: "306171880262",
  appId: "1:306171880262:web:794be59489d68e91fdbb47",
  measurementId: "G-XVQRFFHE1S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);

// sign in using Google
const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const signIn = () =>
  signInWithPopup(auth, provider)
    .then(result => {
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorMessage);
    });

export const logOut = () =>
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      // console.log("log out");
    })
    .catch(error => {
      // An error happened.
      console.log(error);
    });

export const emailAndPasswordSignIn = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password).catch(error => {
    const errorInfo = {
      errorCode: error.code,
      errorMessage: error.message,
    };

    console.log(errorInfo);
  });
};
