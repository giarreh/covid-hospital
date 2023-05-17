// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtpI6wfb_WAw6WttTVQD5RLZcVLbzam-E",
    authDomain: "hospital-d716c.firebaseapp.com",
    projectId: "hospital-d716c",
    storageBucket: "hospital-d716c.appspot.com",
    messagingSenderId: "409762185055",
    appId: "1:409762185055:web:5446a55df7aa2030d080ea"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, db};
