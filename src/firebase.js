// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh9QGEGD8jxM9gWLW6k0aNck0pLY_AcRg",
  authDomain: "testing-42566.firebaseapp.com",
  projectId: "testing-42566",
  storageBucket: "testing-42566.appspot.com",
  messagingSenderId: "469432293224",
  appId: "1:469432293224:web:c235f6471031f9475968dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;