import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc,setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcjmg6idbuYF6qzhZmIHlI0gXZakhT5lM",
  authDomain: "personal-finance-cc89a.firebaseapp.com",
  projectId: "personal-finance-cc89a",
  storageBucket: "personal-finance-cc89a.firebasestorage.app",
  messagingSenderId: "858958384424",
  appId: "1:858958384424:web:e1b61c0ce535a6b6e6141d",
  measurementId: "G-KK4MFH4BSM"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };