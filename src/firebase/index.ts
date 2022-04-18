// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBgkBxezPa43tZqVuHc6Tg43M00XykCUQ",
  authDomain: "unips-3f614.firebaseapp.com",
  projectId: "unips-3f614",
  storageBucket: "unips-3f614.appspot.com",
  messagingSenderId: "322283847829",
  appId: "1:322283847829:web:6971dbc3a9e1eba3665b9c",
  measurementId: "G-94BN20M44D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
