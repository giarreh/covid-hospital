// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5od2W7mcz8x22dHsM7S4dLnWvr2FOs5I",
  authDomain: "covid-montoring-app.firebaseapp.com",
  projectId: "covid-montoring-app",
  storageBucket: "covid-montoring-app.appspot.com",
  messagingSenderId: "520023492298",
  appId: "1:520023492298:web:5eb1d47365b613ca6e1633"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, db};
